package edu.ufl.gatorrush.model;

import javax.persistence.*;
import java.util.*;

/**
 * Represents a two operand equation
 */
@Entity
public class Problem {

    /**
     * Unique Identifier
     */
    @Id
    @GeneratedValue
    private Long id;

    /**
     * Left Operand
     */
    @Column(nullable = false)
    private Integer leftOperand;

    /**
     * Right Operand
     */
    @Column(nullable = false)
    private Integer rightOperand;

    /**
     * Operator
     */
    @Column(nullable = false)
    private Character operator;

    @OneToMany(mappedBy = "problem")
    private List<Attempt> attempts;

    protected Problem() {}

    public Problem(int leftOperand, char operator, int rightOperand) {
        this.leftOperand = leftOperand;
        this.operator = operator;
        this.rightOperand = rightOperand;
    }

    public Long getId() {
        return id;
    }

    public Integer getLeftOperand() {
        return leftOperand;
    }

    public void setLeftOperand(Integer leftOperand) {
        this.leftOperand = leftOperand;
    }

    public Integer getRightOperand() {
        return rightOperand;
    }

    public void setRightOperand(Integer rightOperand) {
        this.rightOperand = rightOperand;
    }

    public char getOperator() {
        return operator;
    }
    
    public Integer getResult() {
        return getResult(leftOperand, operator, rightOperand);
    }

    public static Integer getResult(Integer leftOperand, Character operator, Integer rightOperand) {
        return switch (operator) {
            case '+' -> leftOperand + rightOperand;
            case '-' -> leftOperand - rightOperand;
            case 'x' -> leftOperand * rightOperand;
            case '/' -> leftOperand / rightOperand;
            default -> throw new IllegalStateException("Unexpected value: " + operator);
        };
    }

    public Integer[] getOptions() {
        Random random = new Random();
        boolean flipFlop = random.nextBoolean();
        List<Integer> potentialOptions = new ArrayList<>();
        Integer result = getResult();
        for (int i = 1; i <= 5; i++) {
            potentialOptions.add(result + i);
            potentialOptions.add(result - i);
        }
        List<Integer> options = new ArrayList<>();
        while (options.size() < 3) {
            Integer option = potentialOptions.get(random.nextInt(0, potentialOptions.size()));
            if (option >= 0 && option <= 144 && !option.equals(result) && !options.contains(option)) {
                options.add(option);
            }
        }
        options.add(result);
        Collections.shuffle(options);
        return options.toArray(Integer[]::new);
    }

    public void setOperator(Character operator) {
        if (operator == '+' || operator == '-' || operator == 'x' || operator == '/') {
            this.operator = operator;
        }
    }

    @Override
    public String toString() {
        return String.format("%d %c %d", leftOperand, operator, rightOperand);
    }
}
