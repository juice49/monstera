export default function mapWithPrevious<Input, Output>(
  callback: (previousValues: Output[], currentValue: Input) => Output,
  values: Input[],
): Output[] {
  return values.reduce((reduced, value) => {
    return [...reduced, callback(reduced, value)]
  }, [])
}
