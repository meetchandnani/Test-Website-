import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    content: "MyHisaab transformed how we track our field staff attendance. The AI verification ensures accountability, and the real-time tracking helps us optimize workflows.",
    author: "Rajesh Kumar",
    position: "Operations Manager, TechServe Solutions",
    avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    stars: 5,
  },
  {
    content: "The WhatsApp reporting feature is a game-changer. I get daily attendance summaries without having to log into any system. Perfect for busy executives like me.",
    author: "Priya Sharma",
    position: "CEO, Innovate Retail",
    avatar: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    stars: 5,
  },
  {
    content: "We've tried several attendance systems, but MyHisaab stands out with its ease of use and powerful features. The support team is incredibly responsive too.",
    author: "Amit Patel",
    position: "HR Director, GlobalTech India",
    avatar: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    stars: 4,
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="section bg-gray-50 dark:bg-gray-800">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="section-title dark:text-white">Client Feedback</h2>
          <p className="section-subtitle dark:text-gray-300">
            Don't just take our word for it - hear from businesses that have transformed their workforce management with MyHisaab.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-soft"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonial.stars ? "text-primary fill-primary" : "text-gray-300 dark:text-gray-600"}
                  />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6">"{testimonial.content}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold dark:text-white">{testimonial.author}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.position}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};