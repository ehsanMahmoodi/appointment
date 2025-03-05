/**
 * @swagger
 *  components:
 *   schemas:
 *    CreateAvailableTime:
 *     type: object
 *     required:
 *       - doctorId
 *       - day
 *     properties:
 *      doctorId:
 *       type: number
 *       example: 1
 *      day:
 *       type: date
 *       example: 2025-12-07
 *      patientCapacity:
 *       type: number
 *       example: 1
 *      isActive:
 *       type: boolean
 *       example: true
 * */

/**
 * @swagger
 *  /doctor/available-time:
 *   post:
 *    summary: create available time to doctor
 *    tags:
 *      -  Doctor
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "./#components/schemas/CreateAvailableTime"
 *    responses:
 *     200:
 *      description: success
 * */