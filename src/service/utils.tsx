import Moment from "react-moment";


class Utils {
  dateConvert = (timestamp: number) => {
    const dateToFormat: Date = new Date(timestamp * 1000);
    return <Moment format="hh:mm DD.MM.yyyy" date={dateToFormat} />
  }
}

export default new Utils();
