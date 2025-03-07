/**
 * @swagger
 *  components:
 *   schemas:
 *    CreateMedicalSystem:
 *     type: object
 *     required:
 *       - title
 *     properties:
 *      title:
 *       type: string
 *      description:
 *       type: string
 *      parentId:
 *       type: number
 * */

/**
 * @swagger
 *  /medical-system:
 *   post:
 *    summary: create a new medical system
 *    tags:
 *      - Medical-System
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "./#/components/schemas/CreateMedicalSystem"
 *    responses:
 *     200:
 *      description: success
 * */
