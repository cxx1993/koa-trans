// 默认成功值
const succeed = {
  code: 200,
  isSuccess: true,
  message: '',
  result: {}
};

// 默认失败值
const failed = {
  code: 200,
  isSuccess: false,
  message: {},
  result: {}
};

// 默认错误
const errored = {
  code: 500,
  isSuccess: false,
  message: {},
  result: {}
};

exports.success = function(param) {
  const { payload } = param;
  return { ...succeed, ...payload };
};

exports.fail = function(param) {
  const { payload } = param;

  return { ...failed, ...payload };
};

exports.error = function(param) {
  const { payload } = param;
  return { ...errored, ...payload };
};
