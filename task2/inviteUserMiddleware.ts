import superagent from "superagent";
import { User, Shop } from "./models";

const inviteUserToAuthSystem = (authUrl, invitationBody) => {
  return superagent.post(authUrl).send(invitationBody);
};

const findOrCreateUser = (authId, email) => {
  return User.findOneAndUpdate(
    {
      authId: authId,
    },
    {
      authId: authId,
      email: email,
    },
    {
      upsert: true,
      new: true,
    }
  );
};

const findShopById = (shopId) => {
  return Shop.findById(shopId).exec();
};

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
    let invitationResponse = await inviteUserToAuthSystem(
      authUrl,
      invitationBody
    );

    if (invitationResponse.status === 201) {
      const createdUser = await findOrCreateUser(
        invitationResponse.body.authId,
        invitationBody.email
      );

      const shop = await findShopById(shopId);
      if (!shop) {
        return {
          status: 404,
          body: { message: "Shop not found" },
        };
      }

      if (!shop.invitations || !shop.users) {
        return {
          status: 404,
          body: { message: "Shop error, incorrect properties" },
        };
      }

      if (shop.invitations?.indexOf(invitationResponse.body.invitationId)) {
        shop.invitations.push(invitationResponse.body.invitationId);
      }

      if (shop.users?.indexOf(createdUser._id) === -1) {
        shop.users.push(createdUser);
      }

      await shop.save();

      return {
        status: 200,
        body: { message: "Invited to shop" },
      };
    }

    if (invitationResponse.status === 200) {
      return {
        status: 400,
        body: { message: "User already invited to this shop" },
      };
    }

    return {
      status: 500,
      body: { message: "unhandled InvitationResponse" },
    };
  } catch (error) {
    return {
      status: 500,
      body: { message: "unhandled Error", error },
    };
  }
};

export const inviteUser = async function (req, res) {
  const response = await processInviteUser(req);
  res.status(response.status).json(response.body);
};