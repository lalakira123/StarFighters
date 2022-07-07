import joi from 'joi';

const usersSchema = joi.object({
    firstUser: joi.string(),
    secondUser: joi.string()
});

export default usersSchema;