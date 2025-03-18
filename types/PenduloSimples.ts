import { Engine, Render, Runner, Bodies, Composite, Constraint, Body } from 'matter-js'

export class PenduloSimples {
    // propriedades da renderizaçãp
    private engine: Engine
    private render: Render
    private runner: Runner
    private pivot: { x: number, y: number }
    private esfera: Body
    private restricao: Constraint
    private referencial: Body;
    private trajectory: { x: number, y: number }[] = []
    // Condições Iniciais
    private theta: number = Math.PI / 3  
    private omega: number = 0
    private dt: number = 0.016
    private g: number = 9.81
    private L: number
    private R: number
    private m: number                                // [theta, theta_ponto ]
    private edo = (y: number[], t: number): number[] => [y[1], -this.g / (this.L / 100) * Math.sin(y[0])]

    constructor(canvas: HTMLCanvasElement, pivot: { x: number, y: number }, L: number, R: number, m: number) {
        this.engine = Engine.create()
        this.render = Render.create({
            canvas: canvas,
            engine: this.engine,
            options: {
                width: canvas.width,
                height: canvas.height,
                wireframes: false,
                background: 'white'
            }
        })

        this.pivot = pivot
        this.L = L
        this.R = R
        this.m = m

        this.esfera = Bodies.circle(this.pivot.x, this.pivot.y + this.L, this.R, {
            inertia: Infinity,
            render: {
                fillStyle: 'black'
            }
        })

        this.restricao = Constraint.create({
            pointA: this.pivot,
            bodyB: this.esfera,
            pointB: { x: 0, y: 0 },
            stiffness: 1,
            length: this.L,
            render: {
                strokeStyle: 'black',
                lineWidth: 1.5
            }
        })

        // Criação do retângulo fino horizontal como referencial inercial
        this.referencial = Bodies.rectangle(canvas.width / 2, 20, canvas.width, 5, {
            isStatic: true,
            render: {
                fillStyle: 'red'
            }
        });


        Composite.add(this.engine.world, [this.esfera, this.restricao, this.referencial])

        this.runner = Runner.create()
    }

    private rk4 = (f: (y: number[], t: number) => number[], y0: number[], t0: number, h: number): number[] => {
        const k1 = f(y0, t0)
        const k2 = f(y0.map((yi, i) => yi + 0.5 * h * k1[i]), t0 + 0.5 * h)
        const k3 = f(y0.map((yi, i) => yi + 0.5 * h * k2[i]), t0 + 0.5 * h)
        const k4 = f(y0.map((yi, i) => yi + h * k3[i]), t0 + h)
        return y0.map((yi, i) => yi + (h / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]))
    }

    private rk5 = (f: (y: number[], t: number) => number[], y0: number[], t0: number, h: number): number[] => {
        const k1 = f(y0, t0);
        const k2 = f(y0.map((yi, i) => yi + 0.25 * h * k1[i]), t0 + 0.25 * h);
        const k3 = f(y0.map((yi, i) => yi + (3/32) * h * k1[i] + (9/32) * h * k2[i]), t0 + (3/8) * h);
        const k4 = f(y0.map((yi, i) => yi + (1932/2197) * h * k1[i] - (7200/2197) * h * k2[i] + (7296/2197) * h * k3[i]), t0 + (12/13) * h);
        const k5 = f(y0.map((yi, i) => yi + (439/216) * h * k1[i] - 8 * h * k2[i] + (3680/513) * h * k3[i] - (845/4104) * h * k4[i]), t0 + h);
        const k6 = f(y0.map((yi, i) => yi - (8/27) * h * k1[i] + 2 * h * k2[i] - (3544/2565) * h * k3[i] + (1859/4104) * h * k4[i] - (11/40) * h * k5[i]), t0 + 0.5 * h);
        return y0.map((yi, i) => yi + (h / 6) * (16/135 * k1[i] + 6656/12825 * k3[i] + 28561/56430 * k4[i] - 9/50 * k5[i] + 2/55 * k6[i]));
    };
    

    public start() {
        Engine.run(this.engine)
        Render.run(this.render)
        Runner.run(this.runner, this.engine)
        this.update()
    }

    private radToDeg(radianos: number): number {
        return radianos * (180 / Math.PI);
    }

    private calcularEnergiaCinetica(omega: number): number {
        return 0.5 * this.m * Math.pow(omega * this.L/100, 2);
    }

    private calcularEnergiaPotencial(theta: number): number {
        return this.m * this.g * (this.L/100 * (1 - Math.cos(theta)));
    }

    private calcularEnergiaMecanica(theta: number, omega: number): number {
        return this.calcularEnergiaCinetica(omega) + this.calcularEnergiaPotencial(theta);
    }

    private update = () => {
        [this.theta, this.omega] = this.rk4(this.edo, [this.theta, this.omega], 0, this.dt)
        
        Body.setPosition(this.esfera, { x: this.pivot.x + this.L * Math.sin(this.theta), y: this.pivot.y + this.L * Math.cos(this.theta) })

        const context = this.render.context;
        context.clearRect(0, 0, this.render.canvas.width, this.render.canvas.height);
        Render.world(this.render);

        // Desenhar os valores de theta e omega no canvas
        context.font = '20px Arial';
        context.fillStyle = 'black';
        context.fillText(`θ: ${this.radToDeg(this.theta).toFixed(2)}°`, 10, 30);
        context.fillText(`ω: ${this.radToDeg(this.omega).toFixed(2)}°`, 10, 60)

        // Calcular e desenhar as energias
        const energiaCinetica  = this.calcularEnergiaCinetica(this.omega);
        const energiaPotencial = this.calcularEnergiaPotencial(this.theta);
        const energiaMecanica  = this.calcularEnergiaMecanica(this.theta, this.omega);

        context.fillText(`Ec: ${this.calcularEnergiaCinetica(this.omega).toFixed(2)} J`, 10, 90);
        context.fillText(`Ep: ${this.calcularEnergiaPotencial(this.theta).toFixed(2)} J`, 10, 120);
        context.fillText(`Em: ${this.calcularEnergiaMecanica(this.theta, this.omega).toFixed(2)} J`, 10, 150);
        
        
        // this.trajectory.push({ x: this.esfera.position.x, y: this.esfera.position.y })

        // const context = this.render.context
        // context.clearRect(0, 0, this.render.canvas.width, this.render.canvas.height)
        // Render.world(this.render)
        // context.beginPath()
        // for (let i = 0; i < this.trajectory.length - 1; i++) {
        //     context.moveTo(this.trajectory[i].x, this.trajectory[i].y)
        //     context.lineTo(this.trajectory[i + 1].x, this.trajectory[i + 1].y)
        // }
        // context.strokeStyle = 'red'
        // context.lineWidth = 2
        // context.stroke()

        requestAnimationFrame(this.update)
    }
}
