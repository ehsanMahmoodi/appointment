/**
 * @swagger
 *  components:
 *   schemas:
 *    CreateAppointment:
 *     type: object
 *     required:
 *         - timeId
 *         - doctorId
 *     properties:
 *      doctorId:
 *       type: number
 *       example: 1
 *      timeId:
 *       type: number
 *       example: 1
 * */

/**
 * @swagger
 *  /appointment/create:
 *   post:
 *    summary: create new appointment
 *    tags:
 *      - Appointment
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "./#/components/schemas/CreateAppointment"
 *    responses:
 *     200:
 *      description: success
 * */
