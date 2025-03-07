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
 *    UpdateAppointment:
 *     type: object
 *     properties:
 *      status:
 *       type: string
 *       example: cancel
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
/**
 * @swagger
 *  /appointment/update/{appointmentId}:
 *   patch:
 *    summary: update appointment
 *    tags:
 *      - Appointment
 *    parameters:
 *       -  in: path
 *          name: appointmentId
 *          type: number
 *          required: true
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "./#/components/schemas/UpdateAppointment"
 *    responses:
 *     200:
 *      description: success
 * */
/**
 * @swagger
 *  /appointment/user/reservations/{patientId}:
 *   get:
 *    summary: get user appointments
 *    tags:
 *      - Appointment
 *    parameters:
 *       -  in: path
 *          name: patientId
 *          type: number
 *          required: true
 *    responses:
 *     200:
 *      description: success
 * */
/**
 * @swagger
 *  /appointment/doctor/reservations/{doctorId}:
 *   get:
 *    summary: get user appointments
 *    tags:
 *      - Appointment
 *    parameters:
 *       -  in: path
 *          name: doctorId
 *          type: number
 *          required: true
 *    responses:
 *     200:
 *      description: success
 * */
