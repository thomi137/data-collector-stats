export interface DataPoint {
  data: number;
  lat: number;
  long: number;
}

export class Trial {

  dataPoints: DataPoint[] = [];

  getMax(){
    if (this.dataPoints.length === 0) return 0;
    return Math.max(...this.dataPoints.map(dp => dp.data))
  }

  getMin(){
    if (this.dataPoints.length === 0) return 0;
    return Math.min(...this.dataPoints.map(dp => dp.data))
  }

  getMean() {

    if (this.dataPoints.length < 2) {
      return 0;
    }

    const sum = this.dataPoints
    .map(dataPoint => dataPoint.data)
    .reduce((acc, curr) => acc + curr);

    const numObs = this.dataPoints.length

    return sum/numObs;

  }

  set data(dataPoint: DataPoint){
    this.dataPoints.push(dataPoint);
  }

  getStandardDeviation() {

    if (this.dataPoints.length < 2) {
      return 0;
    }

    const mean = this.getMean();
    const data = this.dataPoints.map(dataPoint => dataPoint.data);
    return Math.sqrt(data.reduce((sq, curr,) => {
      return sq + Math.pow((curr - mean), 2);
    }, 0)/(data.length-1));

  }

  getMedian() {

    if (this.dataPoints.length < 4) {
      return 0;
    }

    const data = this.dataPoints.map(dataPoint => dataPoint.data);
    data.sort((a, b) => a-b);

    console.log(data);

    const half = Math.floor(data.length / 2);
    console.log(half)

    const median = (half % 2 !== 0) ? data[half] : (data[half-1] + data[half])/2.0;

    return median;
  }

  getQuantile(q: number){


    if (this.dataPoints.length < 4) {
      return 0;
    }

    const sorted = this.dataPoints
    .map(dataPoint => dataPoint.data)
    .sort((a, b) => a - b );
    console.log(sorted)
    const pos = (sorted.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] !== undefined) {
        return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
    } else {
        return sorted[base];
    }
  }

}