 export const getTime = () => {
  let message =''
  let hours = new Date().getHours();
  if (24 >hours&&hours > 18) {
    message='晚上好'
  } else if (18>hours&&hours > 12) {
  message='下午好'
  } else if (8 <hours&&hours < 12) {
    message = '早上好'
  } else {
    message= '原始人启动'
  }
  return message
}