package edu.ufl.gatorrush.util;

import edu.ufl.gatorrush.GameMode;
import org.springframework.core.convert.converter.Converter;

public class StringToEnumConverter implements Converter<String, GameMode> {
    @Override
    public GameMode convert(String source) {
        return GameMode.valueOf(source.toUpperCase());
    }
}
