exports.validateData = (data) => {
    const errors = {};

    for (const [key, value] of Object.entries(data)) {
        const error = validate(key, value);
        if (error) {
            errors[key] = error;
        }
    }

    let isValid = Object.keys(errors).length === 0 ? true : false;
    return { isValid, errors };
};

const validate = (key, value) => {
    switch (key) {
        case "username":
            return value.length === 0 ? "username은 필수값 입니다." : false;

        case "email":
            var emailRegExp = /^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
            if (value.length === 0) return "email은 필수값 입니다.";
            if (!value.match(emailRegExp))
                return "이메일 형식으로 입력해 주세요.";
            return false;
        case "pw":
            if (value.length === 0) return "email은 필수값 입니다.";
            if (!value.match(emailRegExp))
                return "이메일 형식으로 입력해 주세요.";
            return false;
        default:
            return false;
    }
};
