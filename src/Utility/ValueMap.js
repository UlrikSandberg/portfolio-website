const map = (value, minOrgSet, maxOrgSet, minNewSet, maxNewSet) => {
  // Find the positive range of the original value -2, 2 = 2-(-2) = 4
  let range = maxOrgSet - minOrgSet;
  // Now adjust the value according to the new positive range, v=0.7 -> 0.7-(-2)=2.7
  let valueRange = value - minOrgSet;
  // Now find the proportional value in the new range 2.7/4 = 0.675.
  let originalProportion = valueRange / range;

  // Find the positive range for the new set -150, 150 = 150-(-150)=300
  let newRange = maxNewSet - minNewSet;
  // Now find the value which matches the original proportion = 300*0.675=202.5
  let mapValue = newRange * originalProportion;
  // Adjust for the positive range slide = 202.5 + (-150) = 52.5
  let adjustMappedValue = mapValue + minNewSet;

  return adjustMappedValue;
};

export default map;
