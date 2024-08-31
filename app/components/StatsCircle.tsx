import colors from '../utils/colors';

type StatsCircleProps = {
    value: React.ReactNode;
    label: string;
    circleColor?: string;
    textSize: {
        valueSize: string;
        labelSize: string;
    };
    circleSize: string;
};

export default function StatsCircle({
    value,
    label,
    circleColor,
    textSize,
    circleSize,
} : StatsCircleProps) {
  return (
    <div tw={`flex flex-col items-center justify-center bg-[${circleColor ?? colors.primaryColor}] min-w-${circleSize} min-h-${circleSize} rounded-full`}>
        <div tw={`flex text-[${colors.textColor}] text-center text-${textSize.valueSize} p-2`}>{value}</div>
        <div tw={`text-[${colors.textColor}] text-center text-${textSize.labelSize} pt-2`}>{label}</div>
    </div>
  )
}
