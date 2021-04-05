export const secToMinutes = (sec: number) => {
    const minuteRep = Math.trunc(sec / 60);
    return sec < 60
      ? `${sec < 10 ? `00:0${sec}` : `00:${sec}`}`
      : `${minuteRep < 10 ? `0${minuteRep}` : minuteRep}:${
        sec - minuteRep * 60 < 10
          ? `0${sec - minuteRep * 60}`
          : sec - minuteRep * 60
      }`;
}