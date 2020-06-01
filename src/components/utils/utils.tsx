export function trimText(text: string, max: number) {
  if (text) {
    if (text.length > max) {
      return text.substring(0, max) + '...';
    }
    return text;
  }
}

export function trimDate(date: Date, max: number) {
  const dateString: string = date.toString();
  if (dateString) {
    if (dateString.length > max) {
      return dateString.substring(0, max) + '...';
    }
    date = new Date(dateString);
    const localDate: any = date.toLocaleDateString();
    return localDate;
  }
}
