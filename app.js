require("dotenv").config()
const path = require("path")
const fastify = require("fastify")({
  logger: true,
})
fastify.register(require("point-of-view"), {
  engine: {
    ejs: require("ejs"),
  },
})

fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/public/",
})

fastify.register(require("fastify-cors"), {
  origin: ["http://localhost"],
})

const Binance = require("node-binance-api")
const binance = new Binance().options({
  APIKEY: process.env.BINANCE_API_KEY,
  APISECRET: process.env.BINANCE_SECRET_KEY,
})

fastify.get("/v1/balance", async (req, rep) => {
  try {
    const futuresBalance = await binance.futuresBalance()
    const balance = futuresBalance.filter((e) => e.asset === "USDT").map((e) => ({ ...e }))[0]
    const currentBalance = parseFloat(balance.crossWalletBalance) + parseFloat(balance.crossUnPnl)
    const targetBalance = Number(req.query.target) || 100
    const distance = targetBalance - currentBalance

    return rep.send({
      crossWalletBalance: balance.crossWalletBalance,
      currentBalance: currentBalance.toFixed(4),
      targetBalance,
      crossUnPnl: parseFloat(balance.crossUnPnl),
      distance: distance.toFixed(4),
      asset: balance.asset,
    })
  } catch (err) {
    return rep.send({
      errCode: 0,
      message: err.message,
    })
  }
})

fastify.get("/", async (req, rep) => {
  try {
    return rep.view("./templates/index.ejs")
  } catch (err) {
    return rep.send({
      errCode: 0,
      message: err.message,
    })
  }
})

fastify.listen(5001, "0.0.0.0", (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
