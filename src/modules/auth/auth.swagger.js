/**
 * @swagger
 *  components:
 *   schemas:
 *    SendOtp:
 *     type: object
 *     required:
 *        - phone
 *     properties:
 *       phone:
 *        type: string
 *        example: "09111111111"
 *    CheckOtp:
 *     type: object
 *     required:
 *        - phone
 *        - code
 *     properties:
 *       phone:
 *        type: string
 *        example: "09111111111"
 *       code:
 *        type: number
 *        example: 1234
 */
/**
 * @swagger
 *  /auth/send-otp:
 *   post:
 *    summary: send otp-code for user phone-number
 *    tags:
 *      - Auth
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "./#/components/schemas/SendOtp"
 *    responses:
 *     200:
 *      description: success
 */
/**
 * @swagger
 *  /auth/check-otp:
 *   post:
 *    summary: verify otp-code on user phone-number
 *    tags:
 *      - Auth
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "./#/components/schemas/CheckOtp"
 *    responses:
 *     200:
 *      description: success
 */
