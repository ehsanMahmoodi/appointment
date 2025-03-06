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
 *    RemoveAvailableTime:
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
 * */

/**
 * @swagger
 *  /doctor/available-time/{doctorId}:
 *   get:
 *    summary: get doctor available times
 *    tags:
 *      -  Doctor
 *    parameters:
 *      - in: path
 *        type: number
 *        name: doctorId
 *        required: true
 *    responses:
 *     200:
 *      description: success
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
/**
 * @swagger
 *  /doctor/available-time:
 *   patch:
 *    summary: edit available time of doctor
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
/**
 * @swagger
 *  /doctor/available-time:
 *   delete:
 *    summary: remove available time of doctor
 *    tags:
 *      -  Doctor
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "./#components/schemas/RemoveAvailableTime"
 *    responses:
 *     200:
 *      description: success
 * */