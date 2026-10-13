export interface LayerInfo {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  analogy: string;
  role: string;
  responsibilities: string[];
  keyComponents: {
    name: string;
    description: string;
    examples: string;
  }[];
  popularTech: {
    name: string;
    category: string;
    iconName: string;
  }[];
  failureConsequence: string;
  sampleCode: {
    language: string;
    filename: string;
    code: string;
  };
}

export interface RequestScenarioStep {
  stepNumber: number;
  station: 'frontend' | 'network' | 'backend' | 'database';
  stationLabel: string;
  title: string;
  description: string;
  detail: string;
  codeSnippet?: {
    lang: string;
    title: string;
    code: string;
  };
  metrics?: {
    latency: string;
    protocol: string;
    status?: string;
  };
}

export interface RequestScenario {
  id: string;
  title: string;
  badge: string;
  description: string;
  initialAction: string;
  finalResult: string;
  steps: RequestScenarioStep[];
}

export interface ArchetypeApp {
  id: string;
  name: string;
  category: string;
  tagline: string;
  summary: string;
  frontendSpecs: string[];
  backendSpecs: string[];
  databaseSpecs: string[];
  specialInfra: string[];
  dataFlowSnippet: string;
  bottleneckChallenge: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface GlossaryItem {
  term: string;
  category: 'General' | 'Frontend' | 'Backend' | 'Base de Datos' | 'Infraestructura';
  definition: string;
  simpleAnalogy: string;
}

export const ARCHITECTURE_LAYERS: LayerInfo[] = [
  {
    id: 'frontend',
    number: '01',
    title: 'Frontend (Capa de Cliente)',
    subtitle: 'La interfaz visible que el usuario toca, ve y escucha',
    analogy: 'En un restaurante, es la mesa, la decoración del salón y la carta física que sostienes con las manos.',
    role: 'Se ejecuta directamente en el dispositivo del usuario (navegador web, teléfono móvil, tablet o PC). Transforma los datos en píxeles y escucha los clics, toques y gestos del usuario.',
    responsibilities: [
      'Renderizar la interfaz gráfica de usuario (botones, formularios, listas, animaciones).',
      'Capturar interacciones del usuario (clics, texto introducido, scroll, gestos táctiles).',
      'Gestionar el estado local temporal (qué pestaña está abierta, qué hay en el carrito antes de pagar).',
      'Validar datos de forma inmediata para dar feedback visual antes de enviar a internet.',
      'Comunicarse con el servidor mediante peticiones HTTP / APIs o WebSockets.'
    ],
    keyComponents: [
      {
        name: 'Vistas & Componentes Visuales',
        description: 'Bloques reutilizables (botones, modales, tarjetas) creados con HTML, CSS o widgets nativos.',
        examples: 'React, Vue, SwiftUI, Jetpack Compose, Flutter'
      },
      {
        name: 'Gestor de Estado (State Management)',
        description: 'La memoria a corto plazo de la app mientras está abierta en pantalla.',
        examples: 'Zustand, Redux, React Hooks (useState), Pinia'
      },
      {
        name: 'Cliente de Red (HTTP Client)',
        description: 'El módulo que empaqueta las solicitudes y habla con las APIs remotas.',
        examples: 'Fetch API nativa, Axios, TanStack React Query'
      },
      {
        name: 'Enrutador (Router)',
        description: 'Cambia de pantalla o URL sin necesidad de recargar la página completa desde cero.',
        examples: 'React Router, Next.js App Router, Vue Router'
      }
    ],
    popularTech: [
      { name: 'React', category: 'Librería Web', iconName: 'Atom' },
      { name: 'Next.js', category: 'Framework Web SSR', iconName: 'Layers' },
      { name: 'Flutter', category: 'Móvil Multiplataforma', iconName: 'Smartphone' },
      { name: 'Swift / SwiftUI', category: 'Nativo iOS', iconName: 'Apple' },
      { name: 'Kotlin Compose', category: 'Nativo Android', iconName: 'Cpu' },
      { name: 'Tailwind CSS', category: 'Diseño & Estilos', iconName: 'Palette' }
    ],
    failureConsequence: 'Si el Frontend falla, la pantalla se queda congelada, en blanco o con botones que no responden, aunque el servidor y la base de datos sigan funcionando perfectamente.',
    sampleCode: {
      language: 'typescript',
      filename: 'UserProfile.tsx (React Frontend)',
      code: `// El Frontend escucha el evento y actualiza la vista
export function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Solicita los datos al backend mediante API
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Cargando perfil...</div>;
  return (
    <div className="card">
      <img src={user?.avatar} alt={user?.name} />
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  );
}`
    }
  },
  {
    id: 'backend',
    number: '02',
    title: 'Backend (Capa de Lógica & Servidor)',
    subtitle: 'El cerebro invisible donde residen las reglas de negocio y la seguridad',
    analogy: 'En un restaurante, es la cocina donde los cocineros preparan los platos siguiendo recetas estrictas y garantizando que no haya comida en mal estado.',
    role: 'Se ejecuta de forma remota y segura en computadoras en la nube (servidores). Nunca expone secretos comerciales, valida permisos, procesa pagos y coordina todas las operaciones.',
    responsibilities: [
      'Procesar y aplicar la lógica de negocio (calcular descuentos, validar saldos bancarios, generar facturas).',
      'Garantizar la seguridad, autenticación (¿quién eres?) y autorización (¿tienes permiso para ver esto?).',
      'Exponer APIs (puntos de entrada seguros como REST, GraphQL o gRPC).',
      'Orquestar la comunicación con bases de datos y servicios de terceros (Stripe, WhatsApp, Gemini AI).',
      'Ejecutar procesos pesados y tareas en segundo plano (enviar correos, comprimir videos).'
    ],
    keyComponents: [
      {
        name: 'Enrutador & Controladores (API Gateway)',
        description: 'Recibe la solicitud en la URL correspondiente y dirige el flujo al código adecuado.',
        examples: 'Express Router, FastAPI routers, Spring Controllers'
      },
      {
        name: 'Middlewares (Filtros de Seguridad)',
        description: 'Verifican tokens JWT, límites de peticiones (Rate Limit) y encabezados CORS.',
        examples: 'Passport.js, cors, helmet, auth middlewares'
      },
      {
        name: 'Servicios de Negocio (Business Logic)',
        description: 'Las funciones puras donde se aplican las reglas estrictas de tu empresa o aplicación.',
        examples: 'paymentService.charge(), orderService.calculateTotal()'
      },
      {
        name: 'Colas & Tareas Asíncronas (Workers)',
        description: 'Trabajos que tardan segundos o minutos y no pueden bloquear la respuesta del usuario.',
        examples: 'BullMQ, Celery, Redis Streams, RabbitMQ'
      }
    ],
    popularTech: [
      { name: 'Node.js / Express', category: 'Runtime JavaScript', iconName: 'Server' },
      { name: 'Python / FastAPI', category: 'Backend & Machine Learning', iconName: 'Terminal' },
      { name: 'Go (Golang)', category: 'Alto rendimiento / Microservicios', iconName: 'Zap' },
      { name: 'Java / Spring Boot', category: 'Enterprise robusto', iconName: 'ShieldCheck' },
      { name: 'NestJS', category: 'Arquitectura estructurada TS', iconName: 'Box' }
    ],
    failureConsequence: 'Si el Backend cae, el frontend seguirá viéndose pero mostrará errores tipo "Error 500: Error interno del servidor" o "No se pudo conectar con el servidor".',
    sampleCode: {
      language: 'typescript',
      filename: 'server.ts (Node.js & Express Backend)',
      code: `// El Servidor valida, procesa y consulta la base de datos
app.post('/api/orders/checkout', verifyToken, async (req, res) => {
  const { cartItems, userId } = req.body;

  // 1. Validar existencias reales en la base de datos
  const inventoryOk = await checkStock(cartItems);
  if (!inventoryOk) {
    return res.status(400).json({ error: 'Producto agotado' });
  }

  // 2. Procesar cobro real mediante pasarela bancaria
  const charge = await stripe.charges.create({
    amount: calculateTotal(cartItems),
    currency: 'usd',
    customer: req.user.stripeId,
  });

  // 3. Guardar orden en la base de datos
  const order = await db.orders.create({ userId, chargeId: charge.id });

  return res.status(201).json({ success: true, orderId: order.id });
});`
    }
  },
  {
    id: 'database',
    number: '03',
    title: 'Base de Datos (Capa de Persistencia)',
    subtitle: 'La memoria permanente donde los datos viven para siempre de forma estructurada',
    analogy: 'En un restaurante, es la despensa, el libro contable de ventas y la cámara de refrigeración con candado.',
    role: 'Almacena la información de forma persistente para que no se pierda al apagar el servidor o cerrar el navegador. Gestiona índices, transacciones seguras (ACID) y relaciones.',
    responsibilities: [
      'Guardar registros permanentes (usuarios, contraseñas encriptadas, publicaciones, compras).',
      'Ejecutar consultas rápidas mediante índices (buscar un usuario entre 10 millones en 2 milisegundos).',
      'Garantizar la consistencia e integridad de los datos (no duplicar cédulas, evitar saldos negativos).',
      'Permitir copias de seguridad (backups), replicación y tolerancia a fallos.'
    ],
    keyComponents: [
      {
        name: 'Bases Relacionales (SQL)',
        description: 'Tablas estructuradas con filas, columnas y claves foráneas estrictas. Ideales para finanzas y relaciones complejas.',
        examples: 'PostgreSQL, MySQL, SQLite, Oracle'
      },
      {
        name: 'Bases No Relacionales (NoSQL)',
        description: 'Documentos JSON flexibles o grafos. Ideales para esquemas que cambian mucho o catálogos dinámicos.',
        examples: 'MongoDB, DynamoDB, Firestore'
      },
      {
        name: 'Caché en Memoria RAM',
        description: 'Almacena resultados súper frecuentes en RAM para responder en sub-milisegundos.',
        examples: 'Redis, Memcached'
      },
      {
        name: 'Almacenamiento de Objetos (Storage)',
        description: 'Discos en la nube diseñados específicamente para fotos, videos y archivos pesados.',
        examples: 'Amazon S3, Google Cloud Storage, Cloudflare R2'
      }
    ],
    popularTech: [
      { name: 'PostgreSQL', category: 'Relacional SQL Líder', iconName: 'Database' },
      { name: 'Redis', category: 'Caché en Memoria', iconName: 'Gauge' },
      { name: 'MongoDB', category: 'Documental NoSQL', iconName: 'FileText' },
      { name: 'Supabase / Firebase', category: 'BaaS (Backend as a Service)', iconName: 'Cloud' },
      { name: 'Amazon S3', category: 'Almacén de Archivos', iconName: 'HardDrive' }
    ],
    failureConsequence: 'Si la Base de Datos falla o se satura de conexiones, las peticiones entran en cola de espera (timeout) y la app se queda colgada sin poder guardar ni leer información.',
    sampleCode: {
      language: 'sql',
      filename: 'queries.sql (PostgreSQL Relacional)',
      code: `-- Consulta transaccional segura con claves foráneas
BEGIN;

-- 1. Descontar inventario disponible
UPDATE products 
SET stock = stock - 1 
WHERE id = 42 AND stock > 0;

-- 2. Insertar registro de la compra
INSERT INTO order_items (order_id, product_id, price_cents, created_at)
VALUES (10084, 42, 2999, NOW());

-- 3. Confirmar la transacción atómica
COMMIT;`
    }
  },
  {
    id: 'infra',
    number: '04',
    title: 'Infraestructura & Conectores (El Pegamento)',
    subtitle: 'Redes, APIs, CDN, nube y seguridad que unen todas las capas',
    analogy: 'En un restaurante, son las tuberías de gas, el cableado eléctrico, el teléfono de pedidos a domicilio y el mesero que camina entre la mesa y la cocina.',
    role: 'Permite que el cliente ubicado en Madrid hable con un servidor en Frankfurt y almacene fotos en Virginia en menos de 100 milisegundos de forma cifrada mediante HTTPS.',
    responsibilities: [
      'DNS & Enrutamiento de nombres de dominio (traducir tudominio.com a una dirección IP).',
      'CDN (Red de Distribución de Contenido): entregar archivos estáticos desde el servidor más cercano.',
      'Cifrado SSL / TLS (el candado verde HTTPS que protege los datos mientras viajan por internet).',
      'Balanceador de Carga (Load Balancer): repartir el tráfico entre múltiples servidores.',
      'Servicios de terceros: Pasarelas de pago, Inteligencia Artificial, Envío de correos y SMS.'
    ],
    keyComponents: [
      {
        name: 'APIs (REST, GraphQL, WebSocket)',
        description: 'El protocolo estandarizado de preguntas y respuestas en formato JSON.',
        examples: 'HTTP/2, HTTP/3, WebSockets para streaming bidireccional'
      },
      {
        name: 'Contenedores & Orquestación',
        description: 'Empaquetan la app con todas sus librerías para que corra idéntica en cualquier máquina.',
        examples: 'Docker, Kubernetes, AWS ECS'
      },
      {
        name: 'Servicios en la Nube',
        description: 'Plataformas donde se alquila la capacidad de cómputo por segundo.',
        examples: 'Google Cloud Platform, AWS, Vercel, Fly.io, Railway'
      }
    ],
    popularTech: [
      { name: 'Docker', category: 'Contenedores', iconName: 'Box' },
      { name: 'Cloudflare', category: 'CDN & Seguridad', iconName: 'Shield' },
      { name: 'GitHub Actions', category: 'CI/CD Automatizado', iconName: 'GitBranch' },
      { name: 'Vercel / Cloud Run', category: 'Despliegue Cloud', iconName: 'UploadCloud' }
    ],
    failureConsequence: 'Si la red o el DNS caen, el usuario verá "No se puede acceder a este sitio web" (DNS_PROBE_FINISHED_NXDOMAIN) sin llegar siquiera a tocar tu servidor.',
    sampleCode: {
      language: 'json',
      filename: 'api-contract.json (JSON Payload)',
      code: `// Formato universal con el que viajan los datos entre las capas
{
  "request": {
    "method": "POST",
    "endpoint": "/api/v1/auth/login",
    "headers": {
      "Content-Type": "application/json",
      "User-Agent": "Mobile-App/2.4.0 (iOS 17.4)"
    },
    "body": {
      "email": "usuario@ejemplo.com",
      "passHash": "sha256$e3b0c44298fc1c149afbf4c8996fb..."
    }
  },
  "response": {
    "status": 200,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400
  }
}`
    }
  }
];

export const REQUEST_SCENARIOS: RequestScenario[] = [
  {
    id: 'login',
    title: 'Iniciar Sesión con Correo y Contraseña',
    badge: 'Autenticación & Seguridad',
    description: 'Cómo viajan tus credenciales de forma cifrada para generar una sesión segura.',
    initialAction: 'El usuario escribe su correo y contraseña en el formulario y hace clic en "Entrar".',
    finalResult: 'La pantalla cambia al panel principal mostrando el avatar y nombre del usuario logueado.',
    steps: [
      {
        stepNumber: 1,
        station: 'frontend',
        stationLabel: '01 · Frontend (Navegador o App)',
        title: 'Captura de Evento y Validación Previa',
        description: 'El botón dispara un evento onSubmit. El código JavaScript verifica que el email tenga un @ válido y que la contraseña no esté vacía antes de enviar.',
        detail: 'Previene llamadas innecesarias al servidor si el usuario olvidó llenar un campo.',
        codeSnippet: {
          lang: 'javascript',
          title: 'handleSubmit.js',
          code: `const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email.includes('@')) return setError('Email inválido');
  setIsLoading(true);
  // Prepara la solicitud HTTP
  await sendLoginRequest(email, password);
};`
        },
        metrics: { latency: '~2ms', protocol: 'Memoria Local' }
      },
      {
        stepNumber: 2,
        station: 'network',
        stationLabel: '02 · Red e Internet (HTTPS / TLS)',
        title: 'Cifrado y Envío del Paquete por la Red',
        description: 'El navegador abre un canal cifrado TLS 1.3. La contraseña viaja encriptada matemáticamente para que nadie en el Wi-Fi público pueda leerla.',
        detail: 'La petición viaja a través de cables submarinos, satélites y enrutadores hacia el servidor.',
        codeSnippet: {
          lang: 'http',
          title: 'POST /api/auth/login',
          code: `POST /api/auth/login HTTP/2
Host: app.miservicio.com
Content-Type: application/json
User-Agent: Chrome/124.0.0.0

{"email":"ana@correo.com","password":"••••••••"}`
        },
        metrics: { latency: '~45ms', protocol: 'HTTPS / TLS 1.3' }
      },
      {
        stepNumber: 3,
        station: 'backend',
        stationLabel: '03 · Backend (Servidor)',
        title: 'Recepción, Rate Limiting y Verificación de Hash',
        description: 'El servidor verifica que la IP no haya intentado 50 veces en 1 minuto (protección anti-fuerza bruta). Extrae el correo para buscarlo en la base de datos.',
        detail: 'El servidor NUNCA guarda ni compara contraseñas en texto plano; utiliza algoritmos de hash criptográficos como bcrypt o argon2.',
        codeSnippet: {
          lang: 'javascript',
          title: 'authController.js',
          code: `// Busca el usuario en BD
const user = await db.users.findByEmail(req.body.email);
if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

// Compara el hash matemático seguro
const valid = await bcrypt.compare(req.body.password, user.passwordHash);
if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });`
        },
        metrics: { latency: '~15ms', protocol: 'Lógica Node.js / Go' }
      },
      {
        stepNumber: 4,
        station: 'database',
        stationLabel: '04 · Base de Datos',
        title: 'Consulta Indexada por Email',
        description: 'El motor de la base de datos usa un índice B-Tree en la columna "email" para encontrar el registro de Ana entre 2 millones de usuarios en microsegundos.',
        detail: 'Devuelve el ID, nombre, rol y el hash cifrado de la contraseña al servidor.',
        codeSnippet: {
          lang: 'sql',
          title: 'PostgreSQL Query',
          code: `SELECT id, name, role, password_hash, avatar_url 
FROM users 
WHERE email = 'ana@correo.com' 
LIMIT 1;`
        },
        metrics: { latency: '~4ms', protocol: 'TCP Socket SQL' }
      },
      {
        stepNumber: 5,
        station: 'backend',
        stationLabel: '05 · Backend (Firma de Token)',
        title: 'Creación de Token JWT o Cookie Segura',
        description: 'Como el hash coincidió, el servidor firma un token digital inviolable (JWT) con una clave secreta que dura 7 días.',
        detail: 'El token contiene { userId: 481, role: "admin" } y permite que las siguientes peticiones no requieran reingresar la contraseña.',
        codeSnippet: {
          lang: 'javascript',
          title: 'generateToken.js',
          code: `const token = jwt.sign(
  { id: user.id, email: user.email }, 
  process.env.JWT_SECRET, 
  { expiresIn: '7d' }
);
res.status(200).json({ token, user: { name: user.name, avatar: user.avatarUrl } });`
        },
        metrics: { latency: '~8ms', protocol: 'JSON Web Token' }
      },
      {
        stepNumber: 6,
        station: 'frontend',
        stationLabel: '06 · Frontend (Actualización de UI)',
        title: 'Recepción del Token y Renderizado del Dashboard',
        description: 'El Frontend recibe el código HTTP 200 OK, almacena el token en la memoria segura, actualiza el estado global de usuario y redirige al dashboard.',
        detail: 'El usuario ve instantáneamente su nombre "¡Bienvenida, Ana!" sin parpadeo de pantalla.',
        codeSnippet: {
          lang: 'javascript',
          title: 'onLoginSuccess.js',
          code: `setAuthUser(data.user);
sessionStorage.setItem('auth_token', data.token);
navigate('/dashboard'); // Transición suave sin recargar web`
        },
        metrics: { latency: '~5ms', protocol: 'React Virtual DOM' }
      }
    ]
  },
  {
    id: 'buy',
    title: 'Comprar un Producto (Transacción Financiera)',
    badge: 'Transacción ACID & Pasarela de Pagos',
    description: 'Cómo se coordinan inventario, pagos con tarjeta de crédito y confirmación de pedido.',
    initialAction: 'El usuario presiona "Confirmar y Pagar $49.00 USD".',
    finalResult: 'Inventario descontado, tarjeta cobrada con recibo bancario y orden generada.',
    steps: [
      {
        stepNumber: 1,
        station: 'frontend',
        stationLabel: '01 · Frontend',
        title: 'Tokenización de Tarjeta de Crédito',
        description: 'Por seguridad (norma PCI-DSS), el número de tarjeta NUNCA toca tus servidores. La librería de Stripe/MercadoPago la envía directo al banco y devuelve un token seguro "tok_1Nxxxx".',
        detail: 'Tu app solo maneja el token temporal inútil para hackers.',
        metrics: { latency: '~90ms', protocol: 'SDK Bancario' }
      },
      {
        stepNumber: 2,
        station: 'backend',
        stationLabel: '02 · Backend',
        title: 'Inicio de Transacción Atómica',
        description: 'El servidor recibe el token y la lista de productos. Abre una transacción en la base de datos para bloquear temporalmente el stock del producto.',
        detail: 'Si dos personas compran la última unidad al mismo milisegundo, la base de datos le da prioridad estricta a una sola.',
        metrics: { latency: '~18ms', protocol: 'ACID Transaction' }
      },
      {
        stepNumber: 3,
        station: 'database',
        stationLabel: '03 · Base de Datos',
        title: 'Bloqueo y Verificación de Stock',
        description: 'Verifica: "¿Hay al menos 1 unidad de Zapatillas Talla 42?". Si sí, decrementa el stock a 0.',
        detail: 'SQL: UPDATE products SET stock = stock - 1 WHERE id = 88 AND stock > 0 RETURNING id;',
        metrics: { latency: '~6ms', protocol: 'Row-Level Lock' }
      },
      {
        stepNumber: 4,
        station: 'backend',
        stationLabel: '04 · Backend & API Externa',
        title: 'Cobro Real a la Pasarela Bancaria',
        description: 'El servidor llama a la API de Visa/Mastercard/Stripe con el token y el monto exacto: charge(amount: 4900, currency: "usd").',
        detail: 'El banco confirma la transferencia bancaria con código "succeeded".',
        metrics: { latency: '~320ms', protocol: 'HTTPS REST API' }
      },
      {
        stepNumber: 5,
        station: 'database',
        stationLabel: '05 · Base de Datos',
        title: 'Persistencia de la Orden y COMMIT',
        description: 'Se guarda la factura en la tabla "orders". Se ejecuta COMMIT: los cambios quedan tallados en piedra de forma irreversible.',
        detail: 'Se programa en una cola en segundo plano el envío del correo de confirmación.',
        metrics: { latency: '~7ms', protocol: 'SQL Commit' }
      },
      {
        stepNumber: 6,
        station: 'frontend',
        stationLabel: '06 · Frontend',
        title: 'Pantalla de Éxito con Número de Rastreo',
        description: 'El backend devuelve HTTP 201 Created con { orderId: "ORD-94821" }. El frontend limpia el carrito y muestra confeti con los datos del pedido.',
        detail: 'Total del proceso: menos de 1 segundo de extremo a extremo.',
        metrics: { latency: '~12ms', protocol: 'Renderizado UI' }
      }
    ]
  },
  {
    id: 'chat',
    title: 'Enviar un Mensaje en Tiempo Real (Chat)',
    badge: 'WebSockets & Streaming Bidireccional',
    description: 'Cómo un mensaje llega a la pantalla de tu amigo en 50 milisegundos sin recargar.',
    initialAction: 'Escribes "¡Hola! ¿Llegaste?" y presionas Enter.',
    finalResult: 'Aparecen los dos checks azules en tu pantalla y la notificación en el teléfono del destinatario.',
    steps: [
      {
        stepNumber: 1,
        station: 'frontend',
        stationLabel: '01 · Frontend',
        title: 'Envío Instantáneo por Conexión WebSocket Abierta',
        description: 'A diferencia de una petición HTTP que se abre y se cierra, el chat mantiene un túnel WebSocket TCP abierto permanentemente con el servidor.',
        detail: 'Emite: socket.emit("send_message", { toUser: 99, text: "¡Hola! ¿Llegaste?" });',
        metrics: { latency: '~5ms', protocol: 'WebSocket Frame' }
      },
      {
        stepNumber: 2,
        station: 'backend',
        stationLabel: '02 · Servidor en Tiempo Real (Node / Go)',
        title: 'Recepción del Frame y Enrutamiento de Socket',
        description: 'El servidor busca en su tabla de conexiones activas en memoria si el usuario 99 está conectado ahora mismo.',
        detail: 'Utiliza Redis Pub/Sub para propagar el mensaje si hay miles de servidores en clúster.',
        metrics: { latency: '~8ms', protocol: 'Event Loop' }
      },
      {
        stepNumber: 3,
        station: 'database',
        stationLabel: '03 · Base de Datos & Redis',
        title: 'Guardado Permanente del Historial',
        description: 'Se guarda el mensaje en la base de datos para que no se pierda si alguien apaga su teléfono.',
        detail: 'INSERT INTO messages (sender_id, receiver_id, content, sent_at) VALUES (...);',
        metrics: { latency: '~12ms', protocol: 'Async Database Save' }
      },
      {
        stepNumber: 4,
        station: 'backend',
        stationLabel: '04 · Servidor hacia Receptor',
        title: 'Push directo al teléfono del amigo',
        description: 'El servidor empuja el mensaje por el socket del amigo: receiverSocket.emit("new_message", payload).',
        detail: 'Si está desconectado, activa el servicio de notificaciones Push de Apple (APNs) o Google (FCM).',
        metrics: { latency: '~25ms', protocol: 'Socket / APNs Push' }
      },
      {
        stepNumber: 5,
        station: 'frontend',
        stationLabel: '05 · Frontend del Destinatario',
        title: 'Llegada y Sonido de Notificación',
        description: 'El teléfono del amigo vibra, reproduce el sonido y agrega la burbuja de chat al final de la conversación automáticamente.',
        detail: 'Envía de regreso un "ack" de confirmación para que en tu pantalla se pinten los dos checks.',
        metrics: { latency: '~10ms', protocol: 'UI Audio & Haptic' }
      }
    ]
  }
];

export const APP_ARCHETYPES: ArchetypeApp[] = [
  {
    id: 'social',
    name: 'Red Social (Instagram / TikTok)',
    category: 'Alto Volumen Multimedia & Feeds Dinámicos',
    tagline: 'Millones de fotos, videos cortos y feeds personalizados en tiempo real.',
    summary: 'Prioriza entrega ultrarrápida de imágenes/videos desde CDNs globales y algoritmos de recomendación.',
    frontendSpecs: [
      'App móvil nativa (iOS Swift / Android Kotlin) para máximo rendimiento gráfico y cámara a 60fps.',
      'Caché agresiva en almacenamiento local (SQLite/Room) para ver posts aún sin conexión a internet.',
      'Virtual scrolling infinito: recicla vistas en memoria para no saturar los recursos del móvil.'
    ],
    backendSpecs: [
      'Microservicios desacoplados: servicio de publicación, servicio de autenticación y servicio de recomendaciones.',
      'Colas de transcodificación de video (FFmpeg) que procesan cada video en 5 resoluciones distintas.',
      'Sistemas de recomendación impulsados por aprendizaje automático (ML).'
    ],
    databaseSpecs: [
      'PostgreSQL o Cassandra para almacenar relaciones de amistad y seguidores.',
      'Redis en memoria para contar millones de "likes" y comentarios en tiempo real sin saturar discos.',
      'Elasticsearch para búsquedas instantáneas de hashtags, creadores y audios.'
    ],
    specialInfra: [
      'CDN Global (Cloudflare/Fastly/CloudFront) para servir videos desde servidores ubicados en la misma ciudad del usuario.',
      'Amazon S3 / Google Cloud Storage para almacenar petabytes de archivos multimedia.',
      'Push Notification Gateways (Apple APNs + Google FCM).'
    ],
    dataFlowSnippet: 'Subir Foto ➔ Subida directa a S3 mediante Signed URL ➔ Webhook a Lambda de redimensionamiento ➔ Notificación al feed de seguidores vía Redis PubSub.',
    bottleneckChallenge: 'Problema del "Fanout on Write": cuando un famoso con 100M de seguidores publica, no puedes escribir en 100M de feeds al mismo tiempo; se usa un feed híbrido bajo demanda.'
  },
  {
    id: 'ecommerce',
    name: 'Comercio Electrónico (Amazon / Mercado Libre)',
    category: 'Transaccional Estricto & Alta Concurrencia',
    tagline: 'Cero margen de error en pagos, control milimétrico de inventario y logística.',
    summary: 'Diseñado bajo consistencia de datos inquebrantable: un producto no puede venderse dos veces por error.',
    frontendSpecs: [
      'Web SPA moderna con Server-Side Rendering (SSR con Next.js) para que Google indexe cada producto en SEO.',
      'Gestión de carrito persistente sincronizada entre la app del móvil y el navegador de escritorio.',
      'Checkouts de un solo clic con Apple Pay, Google Pay y autocompletado de dirección.'
    ],
    backendSpecs: [
      'Motor de precios y promociones con reglas complejas (cupones, impuestos por país, costos de envío).',
      'Integración con pasarelas de pago certificadas con cumplimiento PCI-DSS.',
      'Sistema de órdenes basado en eventos (Event-Driven Architecture) con colas Kafka o RabbitMQ.'
    ],
    databaseSpecs: [
      'Base de datos relacional (PostgreSQL / Aurora) con aislamiento transaccional estricto (ACID).',
      'Caché de catálogo en Redis para soportar millones de visitas durante Black Friday.',
      'Base de datos de búsqueda y filtros por facetas (Algolia o Elasticsearch).'
    ],
    specialInfra: [
      'Balanceadores de carga elásticos que multiplican los servidores automáticamente si el tráfico se triplica.',
      'WAF (Web Application Firewall) para frenar bots que intentan comprar todo el stock automáticamente.',
      'Webhooks bancarios con reintentos idempotentes.'
    ],
    dataFlowSnippet: 'Click Comprar ➔ Validación de stock bloqueando fila ➔ Cobro a Stripe ➔ Emisión de evento "OrderPlaced" ➔ Logística recibe paquete ➔ Email enviado.',
    bottleneckChallenge: 'Condiciones de carrera durante ofertas relámpago: miles de personas intentando comprar las últimas 5 unidades disponibles en el mismo segundo.'
  },
  {
    id: 'streaming',
    name: 'Streaming de Música o Video (Spotify / Netflix)',
    category: 'Streaming de Medios & Baja Latencia',
    tagline: 'Reproducción sin cortes ni buffering, recomendaciones inteligentes y DRM.',
    summary: 'Los archivos pesados se dividen en trozos pequeños de 2 a 5 segundos (HLS/DASH) para reproducción fluida.',
    frontendSpecs: [
      'Reproductor de audio/video optimizado a bajo nivel con decodificación por hardware de la GPU.',
      'Buffer inteligente: descarga los próximos 30 segundos mientras escuchas los primeros 5.',
      'Sincronización remota para controlar la música del televisor desde el teléfono móvil.'
    ],
    backendSpecs: [
      'Servidores de autenticación y verificación de licencias de derechos de autor (DRM Widevine/FairPlay).',
      'Microservicios de búsqueda de metadatos (letras de canciones, artistas, carátulas).',
      'Algoritmos de filtrado colaborativo para listas de reproducción personalizadas ("Descubrimiento semanal").'
    ],
    databaseSpecs: [
      'Bases de datos NoSQL de alta lectura (Cassandra/DynamoDB) para almacenar millones de reproducciones.',
      'Base de datos vectorial (Pinecone/Milvus) para embeddings musicales e inteligencia artificial.',
      'Grafos de relaciones entre artistas, géneros y oyentes.'
    ],
    specialInfra: [
      'Redes de distribución de contenido (CDN) distribuidas por proveedores de internet residenciales.',
      'Fragmentación adaptativa de tasa de bits (Bitrate Adaptation: ajusta la calidad según la velocidad de tu internet).',
      'Almacenamiento masivo redundante en múltiples continentes.'
    ],
    dataFlowSnippet: 'Play Canción ➔ Comprobación de suscripción ➔ Solicitud del manifiesto HLS ➔ Descarga del fragmento .m4a ➔ Buffer de audio ➔ Reproducción.',
    bottleneckChallenge: 'Ancho de banda colosal: Netflix representa hasta el 15% de todo el tráfico de internet del planeta en horas pico nocturnas.'
  },
  {
    id: 'messaging',
    name: 'Mensajería & Colaboración (WhatsApp / Slack)',
    category: 'Baja Latencia & Comunicación Bidireccional',
    tagline: 'Mensajes instantáneos en milisegundos, llamadas VoIP y cifrado punto a punto.',
    summary: 'Construido sobre conexiones persistentes y sincronización de mensajes fuera de línea.',
    frontendSpecs: [
      'Base de datos local en el teléfono (SQLite encriptada con SQLCipher) que almacena todos tus chats.',
      'Módulo de criptografía para cifrado y descifrado de extremo a extremo (E2EE Signal Protocol).',
      'Mecanismos de reconexión automática resilientes a túneles de metro y cambios de red Wi-Fi a 4G/5G.'
    ],
    backendSpecs: [
      'Servidores ligeros altamente concurrentes capaces de sostener millones de sockets abiertos (Erlang/Elixir/Go).',
      'Servidores de señalización WebRTC para conectar llamadas de voz y video directamente entre dos teléfonos.',
      'Servicio de presencia: detecta en tiempo real si tu contacto está "En línea" o "Escribiendo...".'
    ],
    databaseSpecs: [
      'Almacenamiento efímero de colas (los mensajes en tránsito se eliminan del servidor una vez entregados).',
      'Directorio de claves públicas criptográficas de cada dispositivo registrado.',
      'Redis Cluster para gestión de estados de presencia e información de sesiones.'
    ],
    specialInfra: [
      'Servidores TURN / STUN para atravesar firewalls caseros en llamadas de voz y video.',
      'Servicios de compresión de audio y códecs de voz ultraeficientes (Opus).',
      'Sistemas de notificación push para despertar apps dormidas en segundo plano.'
    ],
    dataFlowSnippet: 'Escribir mensaje ➔ Cifrado con clave pública del destinatario ➔ WebSocket a servidor Erlang ➔ Entrega inmediata ➔ Receptor descifra con clave privada.',
    bottleneckChallenge: 'Gestión de presencia a escala: si 2,000 millones de usuarios abren y cierran WhatsApp constantemente, calcular quién está "en línea" sin saturar la red.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: '¿Por qué no podemos poner la lógica del cobro de dinero directamente en el Frontend de la app?',
    options: [
      'Porque el frontend se ejecuta en el dispositivo del usuario y cualquier persona con conocimientos puede manipular el código JavaScript para cambiar el precio a $0.',
      'Porque los navegadores web no tienen permitido conectarse a internet.',
      'Porque las bases de datos no son compatibles con el lenguaje HTML.',
      'Porque los teléfonos móviles no tienen suficiente memoria RAM para calcular sumas.'
    ],
    correctIndex: 0,
    explanation: '¡Exacto! El Frontend se ejecuta en una máquina que no controlas (el teléfono o computadora del cliente). Cualquier validación crítica (precios, permisos, contraseñas) DEBE ejecutarse en el Backend por motivos de seguridad.'
  },
  {
    id: 2,
    question: '¿Cuál es el rol principal de una API (Application Programming Interface) en una app?',
    options: [
      'Dibujar los colores y botones en la pantalla del usuario.',
      'Servir como el contrato de comunicación estandarizado para que el Frontend y el Backend intercambien datos en formato JSON.',
      'Reemplazar la necesidad de tener una base de datos física.',
      'Instalar el sistema operativo en el servidor de la empresa.'
    ],
    correctIndex: 1,
    explanation: '¡Correcto! Una API es como el menú o el mesero: define exactamente qué peticiones puede hacer el cliente (GET, POST, etc.) y qué respuestas devolverá el servidor, independientemente de qué lenguaje use cada uno.'
  },
  {
    id: 3,
    question: '¿Qué sucede si un usuario apaga el teléfono mientras navega por una app?',
    options: [
      'Se borran todos los datos que estaban guardados en la base de datos del servidor.',
      'Se pierde únicamente el estado temporal en la memoria RAM del Frontend, pero los datos guardados en la base de datos persisten intactos.',
      'El backend se detiene para todos los demás usuarios de la aplicación.',
      'La API deja de funcionar permanentemente.'
    ],
    correctIndex: 1,
    explanation: '¡Muy bien! Los datos guardados en la capa de persistencia (Base de Datos en el servidor) son permanentes. Al volver a encender el móvil y abrir la app, el frontend volverá a consultar a la API y recuperará todo.'
  },
  {
    id: 4,
    question: '¿Para qué se utiliza una caché como Redis junto a una base de datos principal como PostgreSQL?',
    options: [
      'Para responder consultas muy repetidas en microsegundos desde memoria RAM, evitando saturar el disco duro de la base de datos.',
      'Para cambiar el diseño de los botones sin necesidad de programar.',
      'Para enviar notificaciones push a teléfonos apagados.',
      'Para sustituir por completo a los lenguajes de programación del backend.'
    ],
    correctIndex: 0,
    explanation: '¡Excelente! Leer de la memoria RAM es hasta 100 veces más rápido que leer del disco duro. Guardar datos populares (como el perfil del usuario o el catálogo del día) en Redis alivia la carga de la base de datos principal.'
  },
  {
    id: 5,
    question: '¿Qué es una CDN (Content Delivery Network)?',
    options: [
      'Un nuevo tipo de lenguaje de programación para crear videojuegos.',
      'Una red mundial de servidores que almacena copias de fotos, videos y archivos estáticos cerca geográficamente del usuario para entregarlos a toda velocidad.',
      'Una aplicación que se instala en el celular para bloquear llamadas no deseadas.',
      'El cable físico que conecta el teclado con la computadora.'
    ],
    correctIndex: 1,
    explanation: '¡Tal cual! Si tu servidor está en Estados Unidos pero un usuario está en Argentina, sin una CDN la foto tardaría cientos de milisegundos en viajar. La CDN entrega la foto desde un servidor réplica en Buenos Aires casi al instante.'
  }
];

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    term: 'Frontend',
    category: 'Frontend',
    definition: 'La parte del software que interactúa directamente con el usuario final. Incluye el diseño visual, las animaciones y la experiencia de usuario.',
    simpleAnalogy: 'La fachada, las vitrinas y los mostradores de una tienda donde atienden a los clientes.'
  },
  {
    term: 'Backend',
    category: 'Backend',
    definition: 'La arquitectura interna que procesa las reglas de negocio, administra la seguridad, ejecuta cálculos y se comunica con las bases de datos.',
    simpleAnalogy: 'Las oficinas administrativas y la bodega interna de la tienda donde los clientes no pueden entrar.'
  },
  {
    term: 'Base de Datos (DB)',
    category: 'Base de Datos',
    definition: 'Sistema informático especializado en almacenar, organizar y recuperar volúmenes masivos de información de forma estructurada y segura.',
    simpleAnalogy: 'Un archivo gigante con archivadores ordenados alfabéticamente y cerrados con candado biométrico.'
  },
  {
    term: 'API (Interfaz de Programación)',
    category: 'General',
    definition: 'Conjunto de reglas y formatos (habitualmente JSON sobre HTTP) que permiten que dos programas de software se comuniquen entre sí.',
    simpleAnalogy: 'El mesero que toma tu pedido en la mesa, va a la cocina a pedirlo y te trae el plato listo a la mesa.'
  },
  {
    term: 'Fullstack',
    category: 'General',
    definition: 'Se refiere al conjunto completo de tecnologías que abarcan tanto el Frontend como el Backend y la persistencia de datos.',
    simpleAnalogy: 'Un chef que también diseñó la carta, atiende las mesas y administra las cuentas contables del restaurante.'
  },
  {
    term: 'JSON (JavaScript Object Notation)',
    category: 'General',
    definition: 'Formato estándar de texto ligero y legible para humanos que se utiliza para transmitir datos estructurados entre clientes y servidores.',
    simpleAnalogy: 'El idioma universal o formulario estándar en el que se envían las cartas oficiales.'
  },
  {
    term: 'JWT (JSON Web Token)',
    category: 'Backend',
    definition: 'Un estándar abierto que define una forma compacta y autónoma de transmitir información de identidad entre partes como un objeto JSON firmado.',
    simpleAnalogy: 'Una pulsera VIP en un concierto: una vez que el guardia te la pone, ya no tienes que mostrar tu DNI en cada barra de bebidas.'
  },
  {
    term: 'Caché',
    category: 'Infraestructura',
    definition: 'Capa de almacenamiento de datos de alta velocidad que almacena un subconjunto de datos para que futuras solicitudes se atiendan con mayor rapidez.',
    simpleAnalogy: 'Tener una libreta pequeña en el bolsillo con los 5 números de teléfono que marcas todos los días en vez de buscar en la guía telefónica.'
  },
  {
    term: 'WebSocket',
    category: 'Frontend',
    definition: 'Protocolo de red que permite un canal de comunicación bidireccional y continuo entre el navegador del usuario y el servidor en tiempo real.',
    simpleAnalogy: 'Una llamada telefónica activa con altavoz: ambos pueden hablar y escucharse instantáneamente sin tener que marcar de nuevo.'
  },
  {
    term: 'Microservicios',
    category: 'Backend',
    definition: 'Enfoque arquitectónico donde una app se divide en pequeños servicios independientes que se comunican entre sí por APIs de red.',
    simpleAnalogy: 'Un centro comercial con tiendas especializadas (panadería, carnicería, zapatería) en lugar de una sola tienda gigante todo-en-uno.'
  },
  {
    term: 'CDN (Content Delivery Network)',
    category: 'Infraestructura',
    definition: 'Red geográfica de servidores distribuidos que entregan contenido web (imágenes, scripts, videos) desde el nodo más cercano físicamente al usuario.',
    simpleAnalogy: 'Tener sucursales de tu pizzería favorita en cada barrio para que la pizza llegue caliente en 10 minutos.'
  },
  {
    term: 'Docker & Contenedores',
    category: 'Infraestructura',
    definition: 'Tecnología que empaqueta una aplicación y todas sus dependencias juntas en una unidad estandarizada para que funcione exactamente igual en cualquier máquina.',
    simpleAnalogy: 'Un contenedor marítimo estandarizado: da igual si viaja en barco, tren o camión, la carga interior se transporta intacta.'
  }
];

export const STACK_BUILDER_OPTIONS = {
  platforms: [
    { id: 'web', name: 'Web App Moderna (SPA / SSR)', desc: 'Accesible desde cualquier navegador en PC y móviles sin descargas de tiendas.', defaultFe: 'react' },
    { id: 'mobile_native', name: 'Móvil Nativa (iOS & Android)', desc: 'Máximo rendimiento, acceso profundo a sensores de cámara, Bluetooth y GPU.', defaultFe: 'swift_kotlin' },
    { id: 'cross_platform', name: 'Multiplataforma Móvil & Web', desc: 'Una sola base de código que compila para iPhone, Android y Navegadores.', defaultFe: 'flutter' },
    { id: 'desktop', name: 'App de Escritorio (Windows / Mac)', desc: 'Herramientas de productividad pesada con acceso al sistema de archivos local.', defaultFe: 'electron' }
  ],
  frontends: [
    { id: 'react', name: 'React + Next.js', platform: ['web', 'cross_platform'], role: 'El ecosistema más adoptado del mundo con soporte de renderizado en servidor.' },
    { id: 'vue', name: 'Vue.js + Nuxt', platform: ['web'], role: 'Sintaxis limpia, curva de aprendizaje amigable y excelente rendimiento reactivo.' },
    { id: 'flutter', name: 'Flutter (Dart)', platform: ['cross_platform', 'mobile_native'], role: 'Motor gráfico propio de Google que dibuja a 60-120fps en iOS y Android.' },
    { id: 'swift_kotlin', name: 'SwiftUI (iOS) & Jetpack Compose (Android)', platform: ['mobile_native'], role: 'Componentes oficiales 100% nativos del sistema operativo de cada fabricante.' },
    { id: 'electron', name: 'Electron / Tauri', platform: ['desktop'], role: 'Permite empaquetar tecnologías web con binarios nativos en Rust o C++.' }
  ],
  backends: [
    { id: 'nodejs', name: 'Node.js con Express / NestJS', role: 'JavaScript/TypeScript unificado en cliente y servidor; enorme ecosistema NPM.' },
    { id: 'python', name: 'Python con FastAPI', role: 'Ideal para procesar datos, inteligencia artificial y APIs REST modernas ultrarrápidas.' },
    { id: 'golang', name: 'Go (Golang)', role: 'Velocidad de ejecución en lenguaje compilado, consumo mínimo de RAM y concurrencia masiva.' },
    { id: 'serverless', name: 'Arquitectura Serverless (Cloud Functions)', role: 'Funciones que se despiertan bajo demanda; escalan a cero costo cuando no hay usuarios.' }
  ],
  databases: [
    { id: 'postgres', name: 'PostgreSQL (Relacional SQL)', role: 'La base de datos relacional open source más confiable para datos transaccionales y JSON híbrido.' },
    { id: 'mongodb', name: 'MongoDB (NoSQL Documental)', role: 'Estructura flexible en documentos tipo JSON, perfecta para prototipos ágiles y catálogos cambiantes.' },
    { id: 'supabase', name: 'Supabase / Firebase (Backend as a Service)', role: 'Base de datos en tiempo real con autenticación y almacenamiento ya incluidos listos para usar.' },
    { id: 'redis_sql', name: 'PostgreSQL + Redis Caché', role: 'Arquitectura de alto rendimiento combinando persistencia relacional estricta con velocidad RAM.' }
  ],
  integrations: [
    { id: 'auth', name: 'Autenticación OAuth / JWT', desc: 'Permite a los usuarios registrarse con Google, Apple o correo.' },
    { id: 'payments', name: 'Pasarela de Pagos (Stripe)', desc: 'Cobros con tarjetas bancarias, suscripciones y transferencias.' },
    { id: 'storage', name: 'Almacenamiento Cloud S3', desc: 'Subida y almacenamiento de imágenes, videos y PDFs.' },
    { id: 'ai', name: 'Inteligencia Artificial (Gemini API)', desc: 'Capacidades cognitivas como análisis de texto, visión o generación de contenido.' },
    { id: 'realtime', name: 'WebSockets en Vivo', desc: 'Chats, notificaciones push instantáneas y pizarras colaborativas.' }
  ]
};
