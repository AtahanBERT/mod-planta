const { ShardingManager } = require ('discord.js')
const ayarlar = require ('./ayarlar.json')

const shards = new ShardingManager ('./bot.js', {

token : process.env.token,

totalShards : 1

});

shards.on('launch', shard => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Launched shard #${shard.id}`);
});

shards.on('message', (shard, msg) => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] #${shard.id} | ${msg._eval} | ${msg._result}`);
});


shards.spawn()