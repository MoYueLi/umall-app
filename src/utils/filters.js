// 有￥的价格
export const filterPrice = (price) => {
  return '￥' + price.toFixed(2)
}

// 没有￥的价格
export const filterPriceNo = (price) => {
  return price.toFixed(2)
}
