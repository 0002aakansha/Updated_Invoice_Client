export default function getFromatDate(date: string) {
  return new Date(date?.split("/")?.reverse()?.join("-"));
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function getStandardDate(date: string) {
  const formatDate = new Date(date?.split("/")?.reverse()?.join("-"));
  return `${formatDate.getDate().toString().padStart(2, "0")} ${
    months[formatDate.getMonth()]
  }, ${formatDate.getFullYear()}`;
}
