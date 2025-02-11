// back/src/models/User.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class User {
    /**
     * Recherche un utilisateur par email.
     * @param {string} email
     * @returns {Promise<object>}
     */
    static async findByEmail(email) {
        return prisma.user.findUnique({
            where: {email},
        });
    }

    /**
     * Crée un nouvel utilisateur.
     * @param {object} data - Les données de l'utilisateur (nickname, email, password)
     * @returns {Promise<object>}
     */
    static async create(data) {
        return prisma.user.create({
            data,
        });
    }

    /**
     * Met à jour les informations d'un utilisateur.
     * @param {string} id - L'identifiant de l'utilisateur.
     * @param {object} data - Les données à mettre à jour.
     * @returns {Promise<object>}
     */
    static async update(id, data) {
        return prisma.user.update({
            where: {id},
            data,
        });
    }

    /**
     * Supprime un utilisateur par son identifiant.
     * @param {string} id
     * @returns {Promise<object>}
     */
    static async delete(id) {
        return prisma.user.delete({
            where: {id},
        });
    }
}

module.exports = User;
