const knexfile = require("../../knexfile");
const knex = require("knex")(knexfile);

function isTransactionStart(querySpec) {
  return querySpec.sql === "BEGIN;";
}

function isTransactionEnd(querySpec) {
  return querySpec.sql === "COMMIT;" || querySpec.sql === "ROLLBACK;";
}

const transactionDurations = {};

knex.on("query", querySpec => {
  if (process.env.NODE_ENV === "development") {
    console.log("On query", querySpec);

    if (isTransactionStart(querySpec)) {
      if (transactionDurations[querySpec.__knexUid]) {
        console.error("New transaction started, before earlier was ended");
        return;
      }
      transactionDurations[querySpec.__knexUid] = new Date().getTime();
    }

    if (isTransactionEnd(querySpec)) {
      const startTime = transactionDurations[querySpec.__knexUid];
      if (!startTime) {
        console.error("Transaction end detected, but start time not found");
      }
      const endTime = new Date().getTime();
      transactionDurations[querySpec.__knexUid] = null;
      console.log("TRANSACTION DURATION", endTime - startTime);
    }
  }
});

// just as an example of other available events to show when they are called
knex.on("query-response", (res, querySpec) => {
  // console.log('On query response', res, querySpec);
});

knex.on("query-error", (err, querySpec) => {
  // console.log('On query error', err, querySpec);
});

module.exports = knex;
