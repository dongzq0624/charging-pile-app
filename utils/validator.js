/**
 * 表单校验规则
 */

//验证手机号码
export const phone = (phoneNumber) => {
	if (!phoneNumber) {
		return false
	}
	if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phoneNumber)) {
		return false
	}
	return true
}

// 身份证
export const checkCard = data => {
	// 正则表达式：15位或18位数字，末位为数字或者大写字母X
	const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	return reg.test(data);
}