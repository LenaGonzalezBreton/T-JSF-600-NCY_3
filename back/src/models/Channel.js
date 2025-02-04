// back/src/models/Channel.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Channel {
    /**
     * Récupère tous les canaux
     */
    static async findAll() {
        return prisma.channel.findMany();
    }

    /**
     * Recherche un canal par son identifiant
     * @param {string} id
     */
    static async findById(id) {
        return prisma.channel.findUnique({
            where: {id},
        });
    }

    /**
     * Recherche un canal par son nom
     * @param {string} name
     */
    static async findByName(name) {
        return prisma.channel.findUnique({
            where: {name},
        });
    }

    /**
     * Crée un nouveau canal avec le nom spécifié
     * @param {string} name
     */
    static async create(name) {
        return prisma.channel.create({
            data: {name},
        });
    }

    /**
     * Met à jour le nom d'un canal
     * @param {string} id - Identifiant du canal
     * @param {string} newName - Nouveau nom du canal
     */
    static async update(id, newName) {
        return prisma.channel.update({
            where: {id},
            data: {name: newName},
        });
    }

    /**
     * Supprime un canal par son identifiant
     * @param {string} id
     */
    static async delete(id) {
        return prisma.channel.delete({
            where: {id},
        });
    }
}

module.exports = Channel;
