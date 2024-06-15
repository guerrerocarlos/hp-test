import superagent from "superagent";
import { User, Shop } from "./models";

const processInviteUser = async function (req) {
  console.assert(req.body, "request body is required");
  const invitationBody = req.body;

  console.assert(req.params.shopId, "shopId is required");
  console.assert(invitationBody.email, "email is required");

  if (!req.params.shopId || !invitationBody.email) {
    return {
      status: 400,
      body: { message: "shopId and email are required" },
    };
  }

  const shopId = req.params.shopId;
  const authUrl = "https://url.to.auth.system.com/invitation";

  try {
    // First: verify that external auth system processes the request correctly
    let invitationResponse = await superagent
      .post(authUrl)
      .send(invitationBody);

    // If auth system responds with 201, create/find user in our system and add to shop
    if (invitationResponse.status === 201) {
      
      // Create user if not exists
      const createdUser = await User.findOneAndUpdate(
        {
          authId: invitationResponse.body.authId,
        },
        {
          authId: invitationResponse.body.authId,
          email: invitationBody.email,
        },
        {
          upsert: true,
          new: true,
        }
      );

      // Get shop and add user to shop
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return {
          status: 404,
          body: { message: "Shop not found" },
        };
      } else {
        // Add user to shop
        if (shop.invitations.indexOf(invitationResponse.body.invitationId)) {
          shop.invitations.push(invitationResponse.body.invitationId);
        }
        if (shop.users.indexOf(createdUser._id) === -1) {
          shop.users.push(createdUser);
        }
        await shop.save();
        return {
          status: 200,
          body: { message: "Invited to shop" },
        };
      }
    } else if (invitationResponse.status === 200) {
      // If auth system responds with 200, user already invited to shop
      return {
        status: 400,
        body: { message: "User already invited to this shop" },
      };
    } else {
      // If auth system responds with other status code, return error
      return {
        status: 500,
        body: { message: "unhandled InvitationResponse" },
      };
    }
  } catch (error) {
    return {
      status: 500,
      body: { message: "unhandled Error", error: error },
    };
  }
};

export const inviteUser = async function (req, res) {
  const response = await processInviteUser(req);
  res.status(response.status).json(response.body);
};
