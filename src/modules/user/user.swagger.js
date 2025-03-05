/**
 * @swagger
 *  components:
 *   schemas:
 *    EditProfile:
 *     type: object
 *     required:
 *        - profileId
 *     properties:
 *      profileId:
 *       type: number
 *       example: 1
 *      firstName:
 *       type: string
 *       example: ehsan
 *      lastName:
 *       type: string
 *       example: mahmoodi
 *      birthDate:
 *       type: number
 *       example: 2000-03-07
 *      isActive:
 *       type: boolean
 *       example: false
 *      officeAddress:
 *       type: string
 *       example: lorem
 *      hospitalAddress:
 *       type: string
 *       example: lorem
 *      visitDuration:
 *       type: number
 *       example: 15
 *      medicalSystemCode:
 *       type: number
 *       example: 1234
 *      description:
 *       type: string
 *       example: lorem
 * */
/**
 * @swagger
 *  /user/edit-profile:
 *   post:
 *    summary: edit profile of doctor or patient
 *    tags:
 *      - User
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "./#/components/schemas/EditProfile"
 *    responses:
 *     200:
 *      description: success
 * */