const axios = require("axios");

const rollupServer = process.env.ROLLUP_HTTP_SERVER_URL;
console.log("HTTP rollup_server url is " + rollupServer);

// Mocked "Cat Adoption" state
let catState = {};

// Handle advance request (e.g., adopting a cat or updating its status)
const handleAdvance = async (data) => {
  console.log("Received advance request data: " + JSON.stringify(data));

  const { action, catId, userId } = data;

  if (action === "adopt") {
    // Adoption action
    if (catState[catId]) {
      console.log(`Cat ${catId} is already adopted.`);
      return "reject";
    }
    catState[catId] = { owner: userId, status: "happy" };

    // Use Notice API to notify about the adoption
    await axios.post(`${rollupServer}/notice`, {
      payload: `Cat ${catId} adopted by ${userId}`,
    });

    console.log(`Cat ${catId} adopted by ${userId}`);
  } else if (action === "feed" || action === "play") {
    // Update cat's status
    if (!catState[catId]) {
      console.log(`Cat ${catId} is not adopted yet.`);
      return "reject";
    }

    catState[catId].status = action === "feed" ? "full" : "excited";

    // Use Notice API to notify about the status change
    await axios.post(`${rollupServer}/notice`, {
      payload: `Cat ${catId} status updated to ${catState[catId].status}`,
    });

    // Use Voucher API to reward the user
    await axios.post(`${rollupServer}/voucher`, {
      destination: userId,
      payload: `Reward for taking care of cat ${catId}`,
    });

    console.log(`Cat ${catId} is now ${catState[catId].status}`);
  } else {
    console.log(`Unknown action: ${action}`);
    return "reject";
  }

  return "accept";
};

// Handle inspect request (e.g., checking the cat's adoption and status)
const handleInspect = async (data) => {
  console.log("Received inspect request data: " + JSON.stringify(data));

  const { catId } = data;

  if (!catId) {
    console.log("Invalid data: catId missing");
    return;
  }

  const cat = catState[catId];
  if (cat) {
    console.log(
      `Cat ${catId} is adopted by ${cat.owner} and is currently ${cat.status}`
    );
  } else {
    console.log(`Cat ${catId} is not adopted yet.`);
  }
};

// Handle generating reports
const handleReports = async () => {
  console.log("Generating adoption reports...");

  const reportPayload = Object.entries(catState)
    .map(
      ([catId, { owner, status }]) =>
        `Cat ${catId} - Owner: ${owner}, Status: ${status}`
    )
    .join("\n");

  await axios.post(`${rollupServer}/report`, {
    payload: reportPayload,
  });

  console.log("Report generated and sent.");
};

const main = async () => {
  let status = "accept";

  while (true) {
    const response = await axios.post(`${rollupServer}/finish`, {
      status,
    });

    if (response.status === 200) {
      const data = response.data;
      switch (data.request_type) {
        case "advance_state":
          status = await handleAdvance(data.data);
          break;
        case "inspect_state":
          await handleInspect(data.data);
          break;
        case "report":
          await handleReports();
          break;
      }
    } else if (response.status === 202) {
      console.log(response.data);
    }
  }
};

main().catch((e) => {
  console.log(e);
  process.exit(1);
});
