declare type Size = "Desktop" | "Mobile";

declare interface Responsive {
  size: Size;
}

declare interface ResponsiveStyles {
  font: "h6" | "h5";
  styles: SxProps<Theme> | undefined;
	iconStyle: SxProps<Theme> | undefined;
}
