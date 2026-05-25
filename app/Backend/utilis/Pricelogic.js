// utils/pricingLogic.js
const calculatePrice = (basePrice, memberCount) => {
  const discountPerMember = 0.05; // 5% discount per new member
  const maxDiscount = 0.40; // Max 40% off
  
  let currentDiscount = memberCount * discountPerMember;
  if (currentDiscount > maxDiscount) currentDiscount = maxDiscount;
  
  return basePrice * (1 - currentDiscount);
};