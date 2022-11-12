package edu.ufl.gatorrush.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.*;

public class ProblemTests {

    @Test
    void testGetResult() {
        for (int left = 0; left < 100; left++) {
            for (int right = 0; right < 100; right++) {
                Assertions.assertEquals(new Problem(left, '+', right).getResult(), left + right);
                Assertions.assertEquals(new Problem(left, '-', right).getResult(), left - right);
                Assertions.assertEquals(new Problem(left, 'x', right).getResult(), left * right);
                if (right > 0) {
                    Assertions.assertEquals(new Problem(left, '/', right).getResult(), left / right);
                }
            }
        }
    }

    @Test
    void testSetInvalidOperator() {
        Problem problem = new Problem(1, '+', 1);
        problem.setOperator('?');
        Assertions.assertEquals(problem.getOperator(), '+');
    }

    @Test
    void testResultInOptions() {
        Problem problem;
        for (int left = 0; left < 75; left++) {
            for (int right = 0; right < 75; right++) {
                problem = new Problem(left, '+', right);
                Assertions.assertTrue(Arrays.asList(problem.getOptions()).contains(problem.getResult()));
            }
        }
    }

    @Test
    void testUniqueOptions() {
        for (int left = 0; left < 75; left++) {
            for (int right = 0; right < 75; right++) {
                Integer[] options = (new Problem(left, '+', right)).getOptions();
                Assertions.assertEquals(options.length, new HashSet<>(Arrays.asList(options)).size());
            }
        }
    }
}
