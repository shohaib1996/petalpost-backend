import Joi from "joi";

const userNameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(10)
    .required()
    .regex(/^[A-Z][a-z]*$/, "{#label} must start with an uppercase letter"),
  middleName: Joi.string().trim().optional(),
  lastName: Joi.string()
    .trim()
    .required()
    .regex(/^[A-Za-z]+$/, "{#label} must contain only letters"),
});

const guardianSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

const localGuardianSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameSchema.required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  dateOfBirth: Joi.date().required(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloogGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .required(),
  presentAddress: Joi.string().required(),
  permanentAddres: Joi.string().required(),
  guardian: guardianSchema.required(),
  localGuardian: localGuardianSchema.required(),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid("active", "blocked").default("active"),
});

export default studentValidationSchema;
