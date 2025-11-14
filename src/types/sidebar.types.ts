import { ReactNode } from "react";

/**
 * نوع آیتم منوی سایدبار
 */
export interface MenuItem {
    /** کلید یکتا برای routing */
    key: string;
    /** متن نمایشی */
    label: string;
    /** آیکون منو */
    icon: ReactNode;
    /** رنگ آیکون */
    color: string;
    /** تعداد نوتیفیکشن (اختیاری) */
    badge?: number;
    /** زیرمنوها (اختیاری) */
    children?: SubMenuItem[];
    /** غیرفعال کردن منو */
    disabled?: boolean;
    /** مخفی کردن منو */
    hidden?: boolean;
}

/**
 * نوع زیرمنو
 */
export interface SubMenuItem {
    /** کلید یکتا */
    key: string;
    /** متن نمایشی */
    label: string;
    /** آیکون */
    icon: ReactNode;
    /** تعداد نوتیفیکشن */
    badge?: number;
    /** غیرفعال */
    disabled?: boolean;
}

/**
 * تنظیمات تِم سایدبار
 */
export interface SidebarTheme {
    /** رنگ پس‌زمینه */
    bgColor: string;
    /** رنگ متن */
    textColor: string;
    /** رنگ hover */
    hoverBg: string;
    /** رنگ آیتم فعال */
    activeBg: string;
    /** رنگ متن آیتم فعال */
    activeText: string;
    /** رنگ بوردر */
    borderColor: string;
}

/**
 * State سایدبار
 */
export interface SidebarState {
    /** آیا سایدبار جمع شده؟ */
    collapsed: boolean;
    /** حالت تاریک فعال است؟ */
    darkMode: boolean;
    /** منوهای باز شده */
    expandedMenus: string[];
}

/**
 * Actions سایدبار
 */
export interface SidebarActions {
    /** تغییر وضعیت collapse */
    toggleCollapse: () => void;
    /** تغییر تِم */
    toggleTheme: () => void;
    /** باز/بسته کردن زیرمنو */
    toggleSubmenu: (key: string) => void;
    /** بستن همه زیرمنوها */
    closeAllSubmenus: () => void;
}

/**
 * Props کامپوننت سایدبار
 */
export interface SidebarProps {
    /** آیتم‌های منو */
    menuItems: MenuItem[];
    /** عرض سایدبار */
    width?: number;
    /** عرض در حالت جمع شده */
    collapsedWidth?: number;
    /** موقعیت سایدبار */
    position?: "right" | "left";
    /** کلاس اضافی */
    className?: string;
}

/**
 * Props کامپوننت آیتم منو
 */
export interface MenuItemProps {
    /** داده منو */
    item: MenuItem;
    /** آیا فعال است؟ */
    isActive: boolean;
    /** آیا سایدبار جمع شده؟ */
    collapsed: boolean;
    /** تِم فعلی */
    theme: SidebarTheme;
    /** کلیک روی منو */
    onClick: () => void;
    /** باز/بسته کردن زیرمنو */
    onToggleSubmenu?: () => void;
    /** آیا زیرمنو باز است? */
    isExpanded?: boolean;
}

/**
 * Props هدر سایدبار
 */
export interface SidebarHeaderProps {
    /** عنوان */
    title?: string;
    /** لوگو */
    logo?: ReactNode;
    /** آیا جمع شده؟ */
    collapsed: boolean;
    /** تِم */
    theme: SidebarTheme;
}

/**
 * Props فوتر سایدبار
 */
export interface SidebarFooterProps {
    /** اطلاعات کاربر */
    user?: {
        name: string;
        role: string;
        avatar?: string;
    };
    /** آیا جمع شده؟ */
    collapsed: boolean;
    /** حالت تاریک */
    darkMode: boolean;
    /** تِم */
    theme: SidebarTheme;
    /** تغییر تِم */
    onToggleTheme: () => void;
}

/**
 * نوع رنگ‌های پروژه
 */
export type ThemeColor =
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "gray";

/**
 * نوع انیمیشن
 */
export type AnimationType =
    | "fade"
    | "slide"
    | "scale"
    | "none";