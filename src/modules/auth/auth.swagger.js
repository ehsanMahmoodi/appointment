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
 *    RegisterDoctor:
 *     type: object
 *     required:
 *        - profileId
 *        - medicalSystemCode
 *        - medicalSpecialtyId
 *        - nationalCode
 *     properties:
 *       profileId:
 *        type: number
 *        example: 1
 *       medicalSystemCode:
 *        type: number
 *        description: کد نظام پزشکی
 *        example: 1000
 *       medicalSpecialtyId:
 *        type: number
 *        description: تخصص
 *        example: 1
 *       firstName:
 *        type: string
 *        example: ehsan
 *       lastname:
 *        type: string
 *        example: mahmoodi
 *       nationalCode:
 *        type: string
 *        example: 2282222222
 *    RegisterPatient:
 *     type: object
 *     required:
 *        - profileId
 *        - nationalCode
 *     properties:
 *       profileId:
 *        type: number
 *        example: 1
 *       firstName:
 *        type: string
 *        example: ehsan
 *       lastname:
 *        type: string
 *        example: mahmoodi
 *       nationalCode:
 *        type: string
 *        example: 2282222222
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
/**
 * @swagger
 *  /auth/register/doctor:
 *   post:
 *    summary: register doctor
 *    tags:
 *      - Auth
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "./#/components/schemas/RegisterDoctor"
 *    responses:
 *     200:
 *      description: success
 */
/**
 * @swagger
 *  /auth/register/patient:
 *   post:
 *    summary: register patient
 *    tags:
 *      - Auth
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "./#/components/schemas/RegisterPatient"
 *    responses:
 *     200:
 *      description: success
 */
