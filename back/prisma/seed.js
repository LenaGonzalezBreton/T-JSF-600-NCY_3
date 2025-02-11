// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Optionnel : Supprimer d'abord les données existantes pour repartir d'une base vide
    await prisma.privateMessage.deleteMany({});
    await prisma.message.deleteMany({});
    await prisma.channelMembership.deleteMany({});
    await prisma.channel.deleteMany({});
    await prisma.user.deleteMany({});

    // Créer des utilisateurs d'exemple
    const alice = await prisma.user.create({
        data: {
            nickname: 'Alice',
        },
    });

    const bob = await prisma.user.create({
        data: {
            nickname: 'Bob',
        },
    });

    const charlie = await prisma.user.create({
        data: {
            nickname: 'Charlie',
        },
    });

    // Créer des canaux d'exemple
    const general = await prisma.channel.create({
        data: {
            name: 'General',
        },
    });

    const random = await prisma.channel.create({
        data: {
            name: 'Random',
        },
    });

    const tech = await prisma.channel.create({
        data: {
            name: 'Tech',
        },
    });

    // Ajouter des appartenances aux canaux (ChannelMembership)
    await prisma.channelMembership.createMany({
        data: [
            { userId: alice.id, channelId: general.id },
            { userId: bob.id, channelId: general.id },
            { userId: charlie.id, channelId: general.id },
            { userId: alice.id, channelId: random.id },
            { userId: bob.id, channelId: tech.id },
        ],
    });

    // Créer des messages publics dans les canaux
    await prisma.message.createMany({
        data: [
            { content: "Hello everyone!", senderId: alice.id, channelId: general.id },
            { content: "Hi Alice!", senderId: bob.id, channelId: general.id },
            { content: "Welcome to the general channel", senderId: charlie.id, channelId: general.id },
            { content: "Random stuff here", senderId: alice.id, channelId: random.id },
            { content: "Tech news update", senderId: bob.id, channelId: tech.id },
        ],
    });

    // Créer quelques messages privés
    await prisma.privateMessage.createMany({
        data: [
            { content: "Hey Bob, how are you?", senderId: alice.id, recipientId: bob.id },
            { content: "I'm good, thanks Alice!", senderId: bob.id, recipientId: alice.id },
        ],
    });

    console.log("Data seeding completed");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
