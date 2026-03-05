// validate.middleware.js
export const validate = (schema) => {
  // return a middleware function
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // validation failed → send 400
      return res.status(400).json({ errors: result.error.errors });
    }

    // replace req.body with parsed/validated data
    req.body = result.data;
    next(); // continue to next middleware/controller
  };
};