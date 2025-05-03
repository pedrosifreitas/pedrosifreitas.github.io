function RandomTitle()
{
  let names = [
    "Get the cool shoeshine!",
    "And you have my axe!",
    "May your sword be sharp, and your tongue sharper!",
    "Coming in hot!",
    "!sdrawkcaB (I got bored)"
  ];
  
  let r = floor(random(names.length));
  
  return names[r];
}
