// src/config/antd-theme.ts
import type { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
    token: {
        // رنگ‌های اصلی
        colorPrimary: '#328E6E',
        colorSuccess: '#6FCF97',
        colorWarning: '#BFA980',
        colorError: '#E74C3C',
        colorInfo: '#3498DB',

        // رنگ‌های متن
        colorText: '#444C47',
        colorTextSecondary: '#6B746E',
        colorTextTertiary: '#8F9893',
        colorTextQuaternary: '#B4BBB7',

        // رنگ‌های پس‌زمینه
        colorBgContainer: '#FFFFFF',
        colorBgElevated: '#FFFFFF',
        colorBgLayout: '#F7FAF9',
        colorBgSpotlight: '#E8F0ED',

        // رنگ‌های Border
        colorBorder: '#E0E7E4',
        colorBorderSecondary: '#C5D0CB',

        // Typography
        fontFamily: "'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontSize: 16,
        fontSizeHeading1: 48,
        fontSizeHeading2: 36,
        fontSizeHeading3: 30,
        fontSizeHeading4: 24,
        fontSizeHeading5: 20,

        // Border Radius
        borderRadius: 12,
        borderRadiusLG: 16,
        borderRadiusSM: 8,
        borderRadiusXS: 4,

        // Spacing
        padding: 16,
        paddingLG: 24,
        paddingSM: 12,
        paddingXS: 8,

        // Control Heights
        controlHeight: 48,
        controlHeightLG: 56,
        controlHeightSM: 40,
    },

    components: {
        Button: {
            colorPrimary: '#328E6E',
            colorPrimaryHover: '#3FA681',
            colorPrimaryActive: '#2A7A5E',
            fontSize: 16,
            fontWeight: 600,
            borderRadius: 12,
            controlHeight: 48,
        },

        Input: {
            colorBorder: '#E0E7E4',
            colorPrimaryHover: '#3FA681',
            borderRadius: 12,
            controlHeight: 48,
            fontSize: 16,
        },

        Select: {
            colorBorder: '#E0E7E4',
            borderRadius: 12,
            controlHeight: 48,
            fontSize: 16,
        },

        Card: {
            colorBorderSecondary: '#E0E7E4',
            borderRadiusLG: 20,
            paddingLG: 32,
        },

        Form: {
            labelFontSize: 14,
            labelColor: '#444C47',
        },
    },
};

export default antdTheme;