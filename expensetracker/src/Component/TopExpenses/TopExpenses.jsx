import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import "./TopExpenses.css";

export default function TopExpenses({ transactions }) {
    // Function to process transactions and return chart data
    const getChartData = () => {
        // Aggregate data by category
        const data = transactions.reduce((acc, { category, price }) => {
            const existing = acc.find(item => item.name === category);
            if (existing) {
                existing.value += price;
            } else {
                acc.push({ name: category, value: price });
            }
            return acc;
        }, []);

        // Sort data by value in descending order
        return data.sort((a, b) => b.value - a.value);
    };

    const chartData = getChartData();

    return (
        <div className="expensechart">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical" barSize={30}>
                    <XAxis type='number' hide />
                    <YAxis type="category" width={120} dataKey="name" />
                    <Bar dataKey="value" fill="#8784D2" />
                    {/* <Tooltip/> */}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
