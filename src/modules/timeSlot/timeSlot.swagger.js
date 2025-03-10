/**
 * @swagger
 *  components:
 *   schemas:
 *    CreateTimeSlot:
 *     type: object
 *     required:
 *         - dayId
 *         - start
 *     properties:
 *      dayId:
 *       type: number
 *       example: 1
 *      start:
 *       type: string
 *       example: "12:15"
 *      end:
 *       type: string
 *       example: "18:00"
 *    UpdateTimeSlot:
 *     type: object
 *     required:
 *         - id
 *     properties:
 *      id:
 *       type: number
 *       example: 1
 *      start:
 *       type: string
 *       example: "12:15"
 *      end:
 *       type: string
 *       example: "18:00"
 *    RemoveTimeSlot:
 *     type: object
 *     required:
 *         - id
 *     properties:
 *      id:
 *       type: number
 *       example: 1
 */

/**
 * @swagger
 *  /doctor/time-slot/{dayId}:
 *   get:
 *    summary: get doctor free times
 *    tags:
 *      -  Doctor
 *    parameters:
 *       -  in: path
 *          name: dayId
 *          type: number
 *          required: true
 *    responses:
 *     200:
 *      description: success
 * */
/**
 * @swagger
 *  /doctor/time-slot:
 *   post:
 *    summary: create time slot for available day of doctor
 *    tags:
 *      -  Doctor
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "./#components/schemas/CreateTimeSlot"
 *    responses:
 *     200:
 *      description: success
 * */
/**
 * @swagger
 *  /doctor/time-slot:
 *   patch:
 *    summary: update time slot for available day of doctor
 *    tags:
 *      -  Doctor
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "./#components/schemas/UpdateTimeSlot"
 *    responses:
 *     200:
 *      description: success
 * */
/**
 * @swagger
 *  /doctor/time-slot:
 *   delete:
 *    summary: remove time slot on available day of doctor
 *    tags:
 *      -  Doctor
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "./#components/schemas/RemoveTimeSlot"
 *    responses:
 *     200:
 *      description: success
 * */
