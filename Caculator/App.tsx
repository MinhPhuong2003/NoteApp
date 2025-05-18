import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const App: React.FC = () => {
  const [expression, setExpression] = useState<string>(''); // Biểu thức
  const [result, setResult] = useState<string>('0'); // Kết quả
  const [currentValue, setCurrentValue] = useState<string>(''); // Giá trị hiện tại đang nhập
  const [isResultDisplayed, setIsResultDisplayed] = useState<boolean>(false); // Kiểm tra khi nào hiển thị kết quả

  const handlePress = (value: string) => {
    try {
      if (value === 'C') {
        // Xóa toàn bộ biểu thức
        setExpression('');
        // Cập nhật kết quả về 0
        setResult('0');
        // Xóa giá trị đang nhập
        setCurrentValue('');
        // Không hiển thị kết quả
        setIsResultDisplayed(false);
      } else if (value === 'CE') {
        setCurrentValue(''); // Đặt lại currentValue về rỗng
        setExpression((prev) => {
          // Kiểm tra vị trí dấu toán tử (cộng, trừ, nhân, chia)
          const operatorIndex = prev.lastIndexOf('+') >= 0 ? prev.lastIndexOf('+') :
                               prev.lastIndexOf('-') >= 0 ? prev.lastIndexOf('-') :
                               prev.lastIndexOf('×') >= 0 ? prev.lastIndexOf('×') :
                               prev.lastIndexOf('÷') >= 0 ? prev.lastIndexOf('÷') : -1;
          // Nếu có dấu toán tử và phần sau dấu toán tử (số thứ hai), xóa phần sau dấu toán tử
          if (operatorIndex >= 0) {
            const updatedValue = prev.slice(0, operatorIndex + 2); // Giữ lại phần trước dấu toán tử và toán tử (ví dụ: '8 +')
            setResult('0'); // Đặt lại kết quả về 0 khi nhấn CE
            return updatedValue; // Trả về giá trị đã thay đổi
          }
          // Nếu không có toán tử, không thay đổi gì cả
          return prev;
        });
        // Đặt kết quả về 0 sau khi nhấn CE
        setResult('0'); 
        setIsResultDisplayed(false); // Không hiển thị kết quả khi nhấn CE
      } else if (value === '⌫') {
        setCurrentValue((prev) => {
          if (prev.length > 0) {
            const updatedValue = prev.slice(0, -1); // Xoá ký tự cuối
      
            setResult(updatedValue); // ✅ Cập nhật dòng kết quả để đồng bộ với currentValue
      
            return updatedValue;
          }
          return prev;
        });
        setIsResultDisplayed(false);
      } else if (value === '=') {
        if (isResultDisplayed) return; // Nếu đã hiển thị kết quả như sqrt(9), không tính lại nữa
        if (expression === '' || currentValue === '') return;
        const fullExpression = expression + currentValue;
        const evalResult = eval(fullExpression.replace(/×/g, '*').replace(/÷/g, '/'));
        if (isNaN(evalResult)) {
          setResult('Error');
        } else {
          setResult(evalResult.toString());
          setExpression(expression + currentValue + '=');
          setIsResultDisplayed(true);
          setCurrentValue('');
        }
      } else if (value === '√x') {
        const number = parseFloat(currentValue || result);
        if (number < 0) {
          setResult('Error');
          setExpression(`√${number}`);
          setCurrentValue('');
        } else {
          const sqrtResult = Math.sqrt(number);
          setResult(sqrtResult.toString());
          setExpression(`√${number}`);
          setCurrentValue('');
          setIsResultDisplayed(true);
        }
      } else if (value === 'x²') {
        const number = parseFloat(currentValue || result);
        const squareResult = Math.pow(number, 2);
        setResult(squareResult.toString());
        setExpression(`sqr(${number})`);
        setCurrentValue('');
        setIsResultDisplayed(true);
      } else if (value === '1/x') {
        const number = parseFloat(currentValue || result);
        if (number === 0) {
          setResult('Error');
          setExpression(`1/(${number})`);
          setCurrentValue('');
        } else {
          const inverseResult = 1 / number;
          setResult(inverseResult.toString());
          setExpression(`1/(${number})`);
          setCurrentValue('');
          setIsResultDisplayed(true);
        }
      } else if (value === '+/-') {
        const number = parseFloat(currentValue || result);
        const negated = (-number).toString();
        setCurrentValue(negated);
        setResult(negated);
      } else if (value === '%') {
        const number = parseFloat(currentValue || result);
        const percentValue = (number / 100).toString();
        setCurrentValue(percentValue);
        setResult(percentValue);
        setExpression(`${number}%=`);
        setIsResultDisplayed(true);
      }
       else if (['+', '-', '×', '÷'].includes(value)) {
        if (currentValue !== '') {
          setExpression(expression + currentValue + value);
          setResult(currentValue);
          setCurrentValue('');
        }
      } else {
        if (isResultDisplayed) {
          setExpression('');
          setCurrentValue(value);
          setResult(value);
          setIsResultDisplayed(false);
        } else {
          setCurrentValue((prev) => prev + value);
          setResult(currentValue + value);
        }
      }
    } catch (err) {
      console.log('Error:', err);
      setResult('Error');
    }
  };
  

  const rows: string[][] = [
    ['%', 'CE', 'C', '⌫'],
    ['1/x', 'x²', '√x', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['+/-', '0', '.', '='],
  ];

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        {/* Hiển thị phép toán */}
        <Text style={styles.expression}>{expression}</Text>
        {/* Hiển thị kết quả */}
        <Text style={styles.result}>{result}</Text>
      </View>
      {rows.map((row, i) => (
        <View key={i} style={styles.row}>
          {row.map((btn) => (
            <TouchableOpacity
              key={btn}
              style={[styles.button, btn === '=' && styles.equals]}
              onPress={() => handlePress(btn)}
            >
              <Text style={styles.buttonText}>{btn}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6ecf2',
    justifyContent: 'flex-end',
    padding: 10,
  },
  display: {
    minHeight: 120,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  expression: {
    fontSize: 24,
    color: '#666',
    textAlign: 'right',
  },
  result: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'right',
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    margin: 5,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  equals: {
    backgroundColor: '#2e7dff',
  },
  buttonText: {
    fontSize: 20,
    color: '#333',
  },
});

export default App;