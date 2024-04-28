// lib/httpUtils.js
import { NextResponse } from 'next/server';
import 'isomorphic-fetch'; // Đảm bảo fetch hoạt động trên cả client và server

export const fetchWithInterceptor = async (url: string, options = {}) => {
  const response = await fetch(url, options);

  if (response.status === 422) {
    // Kiểm tra ngữ cảnh chạy để biết cách xóa cookie
    if (typeof window !== 'undefined') {
      // Nếu chạy trên client, xóa cookie bằng cách đặt ngày hết hạn trong quá khứ
      document.cookie = 'myCookie=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
    } else {
      // Nếu chạy trên server, tạo NextResponse để xóa cookie
      const removeCookieResponse = new NextResponse('Cookie removed');
      removeCookieResponse.headers.set(
        'Set-Cookie',
        'myCookie=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
      );
      return removeCookieResponse; // Trả về phản hồi với tiêu đề để xóa cookie
    }
  }

  return response; // Trả về phản hồi thông thường nếu không có mã 422
};
