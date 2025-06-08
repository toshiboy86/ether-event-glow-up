
import React from 'react';
import { Github, Twitter, MessageCircle, Send } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Ethereum Events',
      description: 'Discover and join the crypto events across the global Ethereum ecosystem',
      links: []
    },
    {
      title: 'Links',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'API Service', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Terms of Service', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' }
      ]
    },
    {
      title: 'Connect',
      links: [
        { label: 'GitHub', href: '#', icon: Github },
        { label: 'Twitter', href: '#', icon: Twitter },
        { label: 'Discord', href: '#', icon: MessageCircle },
        { label: 'Telegram', href: '#', icon: Send }
      ]
    }
  ];

  return (
    <footer className="bg-white border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h4>
              {section.description && (
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{section.description}</p>
              )}
              {section.links.length > 0 && (
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href={link.href} 
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm flex items-center group"
                      >
                        {link.icon && (
                          <link.icon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                        )}
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        
        <div className="border-t border-blue-100 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2025 Ethereum Events. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-200">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
