export default function getFromatDate(date: string) {
    console.log(new Date(date.split("/").reverse().join("-")));
    
  return new Date(date.split("/").reverse().join("-"));
}
