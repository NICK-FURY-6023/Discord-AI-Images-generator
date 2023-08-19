const { Client, GatewayIntentBits } = require('discord.js');
const { createCanvas } = require('canvas');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

const PREFIX = '!';
const allowedChannelId = 'YOUR_ALLOWED_CHANNEL_ID'; // Replace with the ID of the allowed channel

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    // Check if the message is in the allowed channel
    if (message.channelId !== allowedChannelId) return;

    if (message.content.startsWith(PREFIX)) {
        const [command, ...args] = message.content.slice(PREFIX.length).split(' ');

        if (command === 'generate') {
            generateImages(message, args);
        }
    }
});

async function generateImages(message, args) {
    const numImages = parseInt(args[0] || 1);

    const components = [];
    for (let i = 0; i < numImages; i++) {
        const canvas = createCanvas(500, 500);
        const ctx = canvas.getContext('2d');

        // Example image generation code using canvas
        ctx.fillStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const button = {
            type: 2,
            style: 1,
            custom_id: `image_${i}`,
            label: `Image ${i + 1}`
        };

        components.push(button);
    }

    const row = {
        type: 1,
        components: components
    };
    
    await message.channel.send({ content: "Generated Images:", components: [row] });
}

client.login('YOUR_BOT_TOKEN');
