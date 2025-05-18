'use client';

import { Instagram, MessageCircle , Youtube  } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 mt-20">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start gap-10">
        <div className="space-y-4 max-w-sm">
          <h2 className="text-2xl font-bold">MyStore</h2>
          <p className="text-sm text-gray-400">
            Современный магазин с удобным интерфейсом и быстрой доставкой. Спасибо, что выбираете нас!
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-semibold mb-3">Компания</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:underline">О нас</Link></li>
              <li><Link href="/" className="hover:underline">Контакты</Link></li>
              <li><Link href="/" className="hover:underline">Блог</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Поддержка</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:underline">Помощь</Link></li>
              <li><Link href="/" className="hover:underline">Возврат</Link></li>
              <li><Link href="/" className="hover:underline">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Соцсети</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://instagram.com" target="_blank" className="flex items-center gap-2 hover:underline">
                  <Instagram size={18} /> Instagram
                </a>
              </li>
              <li>
                <a href="https://t.me" target="_blank" className="flex items-center gap-2 hover:underline">
                  <MessageCircle  size={18} /> Telegram
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" className="flex items-center gap-2 hover:underline">
                  <Youtube size={18} /> YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        &copy; 2025 MyStore. Все права защищены.
      </div>
    </footer>
  );
}
