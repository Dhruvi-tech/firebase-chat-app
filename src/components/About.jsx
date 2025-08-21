import React, { useState, useEffect } from "react";

export const About = ({ dark }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const features = [
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Experience real-time messaging with instant delivery and minimal latency.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "End-to-end encryption ensures your conversations remain completely private.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "🌍",
      title: "Cross Platform",
      description: "Access your chats from any device, anywhere in the world, seamlessly.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "👥",
      title: "Group Chats",
      description: "Create unlimited group conversations and manage them with ease.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "🎨",
      title: "Rich Messaging",
      description: "Support for emojis, markdown formatting, and interactive elements.",
      color: "from-red-500 to-rose-500"
    },
    {
      icon: "🤖",
      title: "AI Assistant",
      description: "Built-in AI assistant that adapts to different room contexts and conversations.",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const faqs = [
    {
      question: "Is Chat Now free to use?",
      answer: "Yes! Chat Now is completely free to use. You can create unlimited rooms, send unlimited messages, and enjoy all features without any cost."
    },
    {
      question: "How secure are my conversations?",
      answer: "Your conversations are protected with end-to-end encryption. This means only you and the people you're chatting with can read the messages - not even we can access them."
    },
    {
      question: "Can I create private rooms?",
      answer: "Absolutely! You can create custom room names that are known only to you and the people you want to chat with. Room names are case-sensitive for added privacy."
    },
    {
      question: "How does the AI Assistant work?",
      answer: "Our AI Assistant adapts to different room contexts - it becomes a tech expert in Tech Talk, a gaming enthusiast in Gaming rooms, and provides general assistance in other rooms."
    },
    {
      question: "Is there a limit to group size?",
      answer: "No, there's no limit to how many people can join a room. Whether it's a small team chat or a large community discussion, Chat Now scales with your needs."
    },
    {
      question: "Can I use Chat Now on mobile?",
      answer: "Yes! Chat Now works seamlessly across all devices - desktop, tablet, and mobile. Your conversations sync automatically across all your devices."
    },
    {
      question: "What happens to my messages?",
      answer: "Messages are temporarily stored to ensure delivery, but we don't permanently archive your conversations. Your privacy and data security are our top priorities."
    },
    {
      question: "How do I report inappropriate behavior?",
      answer: "If you encounter inappropriate behavior, please contact our support team immediately. We take community safety seriously and will investigate all reports promptly."
    }
  ];

  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Full-stack engineer with 8+ years experience in real-time applications."
    },
    {
      name: "Sarah Johnson",
      role: "UI/UX Designer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Design expert focused on creating intuitive and beautiful user experiences."
    },
    {
      name: "Michael Rodriguez",
      role: "Security Engineer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Cybersecurity specialist ensuring your conversations stay private and secure."
    }
  ];

  return (
    <div
      className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-gradient-to-br from-emerald-400/30 to-blue-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-40 flex flex-1 justify-center py-8">
          <div className={`layout-content-container flex flex-col max-w-6xl flex-1 space-y-16 transition-all duration-1000 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            
            {/* Hero Section */}
            <div className="text-center py-12">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl shadow-2xl">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
                About Chat Rooms
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Connecting people through instant, secure, and intelligent conversations. 
                Built with modern technology to provide the best chatting experience.
              </p>
            </div>

            {/* Mission Section */}
            <div className="@container">
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 rounded-3xl p-8 md:p-12 border border-blue-200/20 dark:border-blue-700/20">
                <div className="text-center space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    Our Mission
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
                    We believe communication should be instant, secure, and effortless. Chat Now was created to bridge 
                    distances and bring people together through technology that just works. Whether you're connecting 
                    with friends, collaborating with colleagues, or building communities, we provide the tools you need 
                    for meaningful conversations.
                  </p>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
                  Powerful Features
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Everything you need for seamless communication, all in one place
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div 
                    key={feature.title}
                    className="group relative overflow-hidden bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    
                    <div className="relative space-y-4">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Find answers to common questions about Chat Now
                </p>
              </div>

              <div className="max-w-4xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                  <div 
                    key={index}
                    className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                        {faq.question}
                      </h3>
                      <svg 
                        className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-8 pb-6">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div className="@container">
              <div 
                className="relative overflow-hidden rounded-3xl p-12 md:p-16"
                style={{
                  background: "linear-gradient(142deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
                }}
              >
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse"></div>
                  <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="relative z-10 text-center space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-white">
                      Get in Touch
                    </h2>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                      Have questions, feedback, or need support? We'd love to hear from you!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="text-center space-y-3">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-white">Email</h3>
                        <p className="text-blue-100">support@chatnow.com</p>
                      </div>
                    </div>

                    <div className="text-center space-y-3">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-white">Live Chat</h3>
                        <p className="text-blue-100">Available 24/7</p>
                      </div>
                    </div>

                    <div className="text-center space-y-3">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold text-white">GitHub</h3>
                        <p className="text-blue-100">Open Source</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                Made with ❤️ for connecting people around the world
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};