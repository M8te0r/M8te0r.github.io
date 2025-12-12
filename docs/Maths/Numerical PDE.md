# Numerical PDE

## PDE 建模

给定一个铁棒，其左端温度为100度，右端温度为0度。现在对这跟铁棒上的热传导过程建模。

$$
A[q(x,t)-q(x+\Delta x,t)] \Delta t=\rho A \Delta x C [u(x,t+\Delta t)-u(x,t)]
$$

-  $A$ 是铁棒的截面积
-  $q(x,t)$ 表示铁棒上 $x$ 处，$t$ 时刻的热通量（热密度）。
-  $\rho$ 是密度，$\rho A \Delta x$ 构成了 $\Delta x$ 的质量。
-  $C$ 是比热容。
-  $u(x,t)$ 表示铁棒上 $x$ 处，$t$ 时刻的温度。

 $q$ 和 $u$ 有如下关系：

$$
q=-k\frac{\partial u}{\partial x}
$$

-  $k$ 是材料的热传导率。

那么，对建模的公式两边同时除以 $A \Delta x \Delta t$ ，有：

$$
\frac{q(x,t)-q(x+\Delta x,t)}{\Delta x}=\frac{u(x,t+\Delta t)-u(x,t)}{\Delta t}
$$


代入 $q$ 和 $u$ 的关系，可以得到偏微分方程：

$$
\frac{\partial u}{\partial t}=\alpha\frac{\partial^2u}{\partial x^2},\quad \alpha=\frac{k}{\rho C}
$$

通常，系统存在外部热源，如增加热源项目 $f(x,t)$ 可以写为：

$$
\frac{\partial u}{\partial t}
=\alpha\frac{\partial^2u}{\partial x^2}
+f(x,t),\quad 
\alpha=\frac{k}{\rho C}\quad f(x,t)=\frac{Q(x,t)}{\rho C}
$$

-  $Q(x,t)$ 是单位体积内，单位时间内产生的热量。
-  $f(x,t)$ 是由于热源/汇的存在，导致的单位时间内的温度变化率。


## 数值求解（差分）
铁棒的总长度为 $L$ ，将铁棒离散为 $N$ 个小段，共有 $i$ 个点，则 $\Delta x=\frac{L}{N}$ ，第 $i$ 个点的位置为 $x_i=i\Delta x$ ;将时间划分为 $n$ 个小段，第 $n$ 个时间段为 $t^n=n\Delta t$ ，则第 $i$ 个点在第 $n$ 个时间段的温度可以表示为：

$$
U_i^n \approx u(x_i,t^n)
$$


对于关于时间的一阶导数 $\frac{\partial u}{\partial x}$ 和关于空间的二阶导数 $\frac{\partial^2u}{\partial x^2}$，可以使用不同的差分方法近似：

$$
\frac{\partial u}{\partial t}(x_i,t^n) 
\approx 
\frac{U_i^{n+1}-U_i^{n}}{\Delta t}
$$

$$
\frac{\partial^2 u}{\partial x^2}(x_i,t^n) 
\approx 
\frac{U_{i-1}^{n}-2U_i^{n}+U_{i+1}^n}{(\Delta x)^2}
$$

代入上述公式至PDE中，可以得到以下**显示欧拉格式**：

$$
U_i^{n+1}=rU_{i-1}^n+(1-2r)U_i^n + rU_{i+1}^n+\Delta t \cdot f_i^n
 \,\,, \quad r=\frac{\alpha \Delta t}{(\Delta x)^2}
$$

直观上来看，这个公示的意思是：下一时刻 $n+1$ 的温度 $u_i^{n+1}$ $=$ 当前时刻 $n$ 的温度 $u_i^n$ $+$ 当前时刻 $n$ 由于热流导致的温度变化。

> 稳定性条件: $r\le \frac{1}{2}$ ，确保数值解不发散
> > 若 $r> \frac{1}{2}$ ，则当前点温度越高，下一刻温度反而越低！


## 变分法与能量
所谓能量，是一个泛函。一个物理系统的状态（比如形状、温度）在稳定或平衡时，总是处于某种能量泛函（Energy Functional）的最小值。通过求解这个泛函的极小值，可以得到系统的平衡状态。

即：优化某个能量，就是在一个无限维的空间中寻找一个函数，使得某个积分表达式取最小值。这个最小值对应的函数就是我们要找的解。

### 能量泛函
函数是把一个数映射到另一个数，泛函是把一个函数映射到另一个数。比方说：

$$
E(u)=\int^b_a\text{描述形变的项}dx
$$

对于一个弹性体，我们有一个描述其形变的函数 $u(x)$。我们可以计算出这个形变 $u(x)$ 所储存的总弹性势能 $E[u]$。这个 $E[u]$ 就是一个能量泛函。它接受一个函数 $u(x)$ 作为输入，输出一个总能量（一个数）。

#### 拉普拉斯方程与泊松方程
考虑上述的一维热传导过程：

$$
\frac{\partial u}{\partial t}
=\alpha\frac{\partial^2u}{\partial x^2}
+f(x,t)
$$

当系统处于稳态时，满足：

$$
\frac{\partial u}{\partial t}=0
$$

且，这里暂且设外部热源 $f(x,t)$ 仅与位置有关系，与时间无关系，即 $f(x)$ 。从而，代入上式，可以得到一个方程：

$$
-\frac{\partial^2u}{\partial x^2}=f(x)
$$

- 当 $f(x)=0$ 时，这个方程称为**拉普拉斯方程**
- 当 $f(x)\ne0$ 时，这个方程称为**泊松方程**

### 变分法与最小化能量泛函
为了能够求解这个泊松方程，我们希望通过最小化某个能量泛函 $\Pi[u]$，以等价于求解这个这个泊松方程。

假设我们找到了一个稳态解 $u(x)$，满足：

$$
-\frac{\partial^2u}{\partial x^2}=f(x)
$$

这里，我们对稳态解 $u(x)$ 进行一个微小的扰动 $\delta u(x)$ ，这个扰动称为 **变分（variation）** ：

$$
u_\epsilon(x)=u(x)+\epsilon \cdot \delta u(x)
$$

其中 $\epsilon$ 是一个非常小的数。这个 $u_{\epsilon}(x)$ 代表了真实解 $u(x)$ 附近的一个可能的温度分布。如果 $u(x)$ 是使 $\Pi[u]$ 最小的函数，那么当我们在 $u(x)$ 这一点考察 $\Pi[u_{\epsilon}]$ 时，它的导数（变分）必须为零：

$$
\left. \frac{d \Pi[u_{\epsilon}]}{d \epsilon} \right|_{\epsilon=0} = 0
$$


#### 单变量函数证明
假设我们有一个普通的函数 $f(x)$，我们要找到它取最小值的点 $x^*$。我们在 $x^*$ 附近构造一个邻域：

$$
x(\epsilon) = x^* + \epsilon \cdot \Delta x
$$

我们计算 $f(x(\epsilon))$ 关于 $\epsilon$ 的导数：

$$
\frac{d f(x(\epsilon))}{d \epsilon} = \frac{d f}{d x} \cdot \frac{d x}{d \epsilon} = f'(x(\epsilon)) \cdot \Delta x
$$

如果 $x^*$ 是极值点，那么在 $\epsilon=0$ 处，导数必须为零：

$$
\left. \frac{d f(x(\epsilon))}{d \epsilon} \right|_{\epsilon=0} = f'(x^*) \cdot \Delta x = 0
$$

### 能量泛函的构造
仍然以一维热传导过程为例，先给出它的能量泛函形式（代表系统总的“非平衡”程度）：

$$
\Pi[u] = \int_{0}^{L} \left[ \frac{1}{2} \left(\frac{d u}{d x}\right)^2 - f(x) u \right] d x
$$

能量的构造主要基于两个层面：
1. 物理学上的最小能量远离
2. 数学上的逆向推导

#### 物理上的直观构造
从物理上看，积分符号由两部分组成：
- 能量耗散： $\frac{1}{2}(\frac{du}{dx})^2$ 。 $\int (\frac{d u}{d x})^2 d x$ 代表了系统为维持热流而产生的总熵生产率或耗散。系统趋向于热流梯度（即 $\frac{d^2 u}{d x^2}$）最小，即 $\frac{d^2 u}{d x^2}=0$（无源无界时）。
- 外源做功： $-f(x) u$ 。这一项代表外部作用力或能量源 $f(x)$ 在场量 $u$ 上做的功。

#### 数学公式上的逆向推导
在数学上，如果一个微分方程满足某些条件，我们可以逆向构造出它的能量泛函，这个过程称为寻找欧拉-拉格朗日方程（Euler-Lagrange Equation）的逆过程。

**欧拉-拉格朗日方程**： 变分法的核心公式是，任何泛函 $\Pi[u] = \int_{a}^{b} L(x, u, u') \, d x$ 的极值函数 $u(x)$ 必须满足：

$$
\frac{\partial L}{\partial u} - \frac{d}{d x} \left( \frac{\partial L}{\partial u'} \right) = 0
$$

-  $L$ 被称为拉格朗日函数。

所以我们希望找到一个 $L$ ，使得上面的公式恰好等于泊松方程：

$$
\frac{\partial L}{\partial u} - \frac{d}{d x} \left( \frac{\partial L}{\partial u'} \right) = -\frac{d^2 u}{d x^2} - f(x) = 0
$$

观察 PDE：它包含 $u$ 的零阶项（$f(x)$）和二阶导数项（$-\frac{d^2 u}{d x^2}$）。

 $\frac{\partial L}{\partial u}$ 对应 $-f(x)$ ：

$$
\frac{\partial L}{\partial u} = -f(x)
$$

 $\frac{d}{d x} \left( \frac{\partial L}{\partial u'} \right)$ 对应 $-\frac{d^2 u}{d x^2}$ ：

$$
-\frac{d}{d x} \left( \frac{\partial L}{\partial u'} \right) = -\frac{d^2 u}{d x^2}
$$

将上述两项结合，可以得到拉格朗日函数 $L$ ：

$$
L(x, u, u') = \frac{1}{2} \left(\frac{d u}{d x}\right)^2 - f(x) u
$$

对 $L$ 积分，可以得到最终的能量泛函：

$$
\Pi[u] = \int_{0}^{L} L \, d x = \int_{0}^{L} \left[ \frac{1}{2} \left(\frac{d u}{d x}\right)^2 - f(x) u \right] d x
$$

### 能量泛函的数值求解
为了能够更好的说明求解过程，这里推广到二维稳态热方程。

在1维中，有 $-\frac{d^2 u}{d x^2} = f(x)$ 。在二维空间中，二阶空间导数被拉普拉斯算子 $\nabla^2$ 替代：

$$
-\nabla^2 u = f(x,y)
$$

-  $\nabla^2 u = \frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2}$
-  $u(x, y)$ 是二维平面上任意点 $(x, y)$ 的稳态温度。
-  $f(x, y)$ 是二维平面上的热源分布。


一维的积分是 $\int_{0}^{L} \dots d x$ 。二维的积分变成了面积分 $\iint_{\Omega} \dots d x d y$。二维泊松方程对应的能量泛函为：
$$
\Pi[u] = 
\iint_{\Omega} 
[ \frac{1}{2} 
    ((\frac{\partial u}{\partial x})^2
        +(\frac{\partial u}{\partial y})^2)
    -f(x,y)u]dxdy
+\text{边界项}
$$

求解能量泛函 $\Leftrightarrow$ 找到函数 $u(x, y)$ 使 $\Pi[u]$ 最小。

由于 $u(x, y)$ 是无限维的（包含无穷多点），我们不能直接最小化 $\Pi[u]$。我们使用三角形或四边形网格来覆盖复杂的求解区域 $\Omega$。在整个求解域 $\Omega$ 上，我们用有限个已知的、简单的基函数 $\phi_j(x, y)$ 的**线性组合**来近似真实的解 $u(x, y)$：

$$
u(x, y) \approx u_h(x, y) = \sum_{j=1}^{N} c_j \phi_j(x,y)
$$

-  $N$: 网格中的总节点数。
-  $c_j$: 节点 $j$ 处的未知温度值（这就是我们要求解的变量！）。
-  $\phi_j(x, y)$: 基函数（在网格生成中，通常是线性的“帽子函数”），它在节点 $j$ 处取值为 $1$，在其他节点处为 $0$，并且只在与节点 $j$ 相邻的单元内是非零的。


代入 $u_h = \sum c_j \phi_j$ 后，泛函 $\Pi$ 就不再是关于函数 $u$ 的泛函了，它变成了一个关于 $N$ 个未知数 $c_1, \dots, c_N$ 的普通多元二次函数 $\Pi(c_1, \dots, c_N)$ ：

$$
\Pi[u_h] = \Pi(c_1,c_2,\cdots,c_N)
$$

所以，为了找到 $\Pi(c_1, \dots, c_N)$ 的最小值，我们只需要对每个未知系数 $c_i$ 求偏导，并令其为0：

$$
\frac{\partial \Pi}{\partial c_i} = 0, \quad \text{对于 } i=1, 2, \dots, N
$$

可以得到离散形式：
$$
\Pi[u] = 
\iint_{\Omega} 
[\frac{1}{2} 
    (\nabla u_h(x,y))^2
    -fu_h(x,y)]dxdy
    +\text{边界项}
$$

X 方向偏导数：

$$
\frac{\partial u_h}{\partial x}=\frac{\partial}{\partial x}(\sum_{j=1}^{N} c_j \phi_j(x,y))=\sum_{j=1}^N c_j \frac{\partial \phi_j(x,y)}{\partial x} \\
\nabla 
$$

梯度向量 $\nabla u_h$：

$$
\nabla u_h = 
\begin{bmatrix} 
\frac{\partial u_h}{\partial x} \\ 
\frac{\partial u_h}{\partial y} 
\end{bmatrix} 
= \sum_{j=1}^{N} c_j 
\begin{bmatrix} \frac{\partial \phi_j}{\partial x} \\ 
\frac{\partial \phi_j}{\partial y} 
\end{bmatrix} 
= \sum_{j=1}^{N} c_j \nabla \phi_j
$$

计算 $(\nabla u_h)^2 = \nabla u_h \cdot \nabla u_h$ ：

$$
\begin{aligned}
(\nabla u_h)^2 &= \left( \sum_{i=1}^{N} c_i \nabla \phi_i \right) \cdot \left( \sum_{j=1}^{N} c_j \nabla \phi_j \right) \\
&= \sum_{i=1}^{N} \sum_{j=1}^{N} c_i c_j (\nabla \phi_i \cdot \nabla \phi_j)
\end{aligned}
$$

代入能量积分：

$$
\iint (\nabla u_h)^2 dx dy = \sum_{i=1}^{N} \sum_{j=1}^{N} c_i c_j \underbrace{\left[ \iint_{\Omega} (\nabla \phi_i \cdot \nabla \phi_j) dx dy \right]}_{K_{ij} \text{ (刚度矩阵元素)}}
$$

上式可以用一个二次型表示：

$$
\text{能量} = \mathbf{c}^T \mathbf{K} \mathbf{c}
$$

从而，上述能量的离散表示为：

$$
\Pi(\mathbf{c}) = \frac{1}{2} \mathbf{c}^T \mathbf{K} \mathbf{c} - \mathbf{c}^T \mathbf{f}
$$

要找最小值，我们需要算它的梯度（Gradient），也就是它的导数向量：

$$
\nabla \Pi(\mathbf{c}) = \mathbf{K} \mathbf{c} - \mathbf{f}
$$

即求解下述方程，既可以得到最小能量：

$$
\mathbf{K} \mathbf{c} = \mathbf{f}
$$

-  $\mathbf{K}$ 是 $N\times N$ 的矩阵，$K_{ij}$ 是能量泛函中梯度平方项的积分 $K_{ij} = \iint_{\Omega} \nabla \phi_i \cdot \nabla \phi_j \, dx dy$ 
-  $\mathbf{f}$ 是长度为 $N$ 的向量，每个元素 $f_i$ 为能量泛函中源项的积分 $f_i = \iint_{\Omega} f(x, y) \phi_i(x, y) \, dx dy$

#### 迭代法
在数值计算中，定义残差向量 $\mathbf{r}$ 为：

$$
\mathbf{r} = \mathbf{f} - \mathbf{K} \mathbf{c} = - \nabla \Pi(\mathbf{c})
$$

目标就是在优化过程中，逐步减少残差。

##### 梯度下降
1. 猜测一个初始解 $\mathbf{c}_0$（比如全为0）。
2. 计算当前的下坡方向（残差）： $\mathbf{r}_0 = \mathbf{f} - \mathbf{K}\mathbf{c}_0$ 。
3. 循环迭代 $k$ ：
    - 确定方向： $\mathbf{p}_k = \mathbf{r}_k$ （直接沿着负梯度走）。
    - 确定步长： $\alpha_k$：对于二次型能量，我们不需要像神经网络那样瞎调学习率，可以用公式算出精确的最优步长，使得这一步走完能量降得最低。$\alpha_k = \frac{\mathbf{r}_k^T \mathbf{r}_k}{\mathbf{r}_k^T \mathbf{K} \mathbf{r}_k}$
    - 更新位置： $\mathbf{c}_{k+1} = \mathbf{c}_k + \alpha_k \mathbf{r}_k$ 。
    - 更新残差： $\mathbf{r}_{k+1} = \mathbf{r}_k - \alpha_k \mathbf{K} \mathbf{r}_k$ 。

##### 共轭梯度 Conjugate Gradient
“最速下降法”之所以慢，是因为它可能会重复在同一个方向上搜索。CG 的策略是：一旦我们在某个方向上完成了搜索，之后所有的搜索方向都应该和这个方向“正交”（共轭），保证绝不走回头路。

对于 $N$ 维问题，CG 理论上最多只需要 $N$ 步就能走到绝对精确的碗底。对于巨大的稀疏矩阵，通常很少的步数就能得到极好的近似解。

``` C++
// 输入：K (稀疏矩阵), f (载荷向量)
// 输出：c (温度分布)

// 1. 初始猜测
Vector c = Vector::Zero(N);
Vector r = f - K * c; // 初始残差（负梯度）
Vector p = r;         // 初始搜索方向 = 残差方向
double rs_old = r.dot(r); // 残差的平方和

for (int k = 0; k < MAX_ITER; ++k) {
    // 2. 核心计算：矩阵向量乘法 (最耗时的一步)
    // 這一步探测了能量碗在方向 p 上的曲率
    Vector Kp = K * p; 

    // 3. 计算最佳步长 alpha
    // 公式推导自：最小化 E(c + alpha*p)
    double alpha = rs_old / p.dot(Kp);

    // 4. 更新解 c
    c = c + alpha * p;

    // 5. 更新残差 r
    // r_new = r_old - alpha * K * p
    r = r - alpha * Kp; 

    // 6. 检查收敛：如果残差足够小，就退出
    double rs_new = r.dot(r);
    if (sqrt(rs_new) < 1e-10) {
        break; 
    }

    // 7. 计算新的搜索方向 p (关键魔法步骤)
    // 我们不直接用新的残差 r 作为方向，而是把它与旧方向 p 混合
    // beta 确保了新方向与旧方向是“共轭”的
    double beta = rs_new / rs_old;
    p = r + beta * p; 

    rs_old = rs_new;
}
```

这个算法的美妙之处：
- 内存友好： 不需要存储 $\mathbf{K}$ 的逆矩阵（那是天大的内存灾难），只需要存储稀疏的 $\mathbf{K}$ 和几个向量（ $\mathbf{c}, \mathbf{r}, \mathbf{p}$ ）。
- 物理含义清晰： 每一步都在修正温度分布，使得能量 $\Pi$ 不断下降，且每个方向只走一次。

##### 牛顿法
- 对于线性问题（如热传导）： 能量泛函是完美的二次抛物面。牛顿法利用二阶导数（Hessian矩阵，也就是 $\mathbf{K}$）的信息。如果你对二次函数用牛顿法，它会一步直接跳到最低点。但是，计算一步牛顿法需要求解 $\mathbf{K}^{-1}$，这等价于直接求解方程组，对于大矩阵是不现实的。
- 对于非线性问题（如导热系数 $\alpha$ 随温度变化）： 能量泛函不再是规则的碗，可能坑坑洼洼。这时我们需要用 **Newton-Raphson** 法，它把非线性问题转化成一序列的线性问题，每一个线性子问题再用 CG 去解。

### 能量泛函的约束条件与对应的数值求解
在偏微分方程（PDE）和数值求解中，约束条件主要有两种体现方式：
1. 直接实施到基函数（适用于边界条件）
2. 引入罚函数或拉格朗日乘子（适用于更复杂的内部或界面约束）。

比方说：我们的目标是最小化能量泛函 $\Pi[u]$，但需要满足约束条件 $\text{s.t. } C(u) = 0$。

#### 第一类约束：狄利克雷边界条件（Dirichlet BCs）
这是最常见、也最容易处理的一类约束。它约束了解 $u$ 在区域边界上的值。
- 物理约束： 在区域边界 $\Gamma_D$ 上，温度必须等于已知值 $g$。 ($\left. u \right|_{\Gamma_D} = g$)
- 优化问题约束： 我们的解 $u$ 必须通过所有边界点 $x \in \Gamma_D$，且 $u(x)=g$。

对于这种约束，在数值实现上，我们直接把约束施加到代数方程组：
在有限元方法（FEM）中，边界条件直接体现在最终的线性方程组 $\mathbf{K} \mathbf{c} = \mathbf{f}$ 上。
回忆： $\mathbf{c}$ 是节点温度向量，边界节点 $i$ 上的 $c_i$ 值是已知的 $g_i$。实现步骤：
1. 修改 $\mathbf{c}$ 向量： 在求解前，将边界节点 $i$ 对应的 $c_i$ 值设置为已知值 $g_i$。
2. 修改 $\mathbf{K}$ 矩阵和 $\mathbf{f}$ 向量（置零法）：
    - 将 $\mathbf{K}$ 矩阵中，与边界节点 $i$ 对应的行和列全部置零，除了对角线元素 $K_{ii}$，将其置为 $1$。
    - 将 $\mathbf{f}$ 向量中，与边界节点 $i$ 对应的元素 $f_i$ 置为 $g_i$。
    
效果： 经过修改，方程组的第 $i$ 行变成了： $0 \cdot c_1 + \dots + 1 \cdot c_i + \dots + 0 \cdot c_N = g_i$ 即 $c_i = g_i$ 。这强制求解器得到的结果满足边界约束，并且保持了矩阵的对称性（如果 $\mathbf{K}$ 本来是对称的）。

#### 第二类约束：拉格朗日乘子法 (Lagrange Multipliers)
这类方法将约束条件 $C(u) = 0$ 引入到能量泛函中，从而构造一个新的、无约束的拉格朗日泛函 $\mathcal{L}[u, \lambda]$ ：

$$
\min_{u, \lambda} \mathcal{L}[u, \lambda] = \Pi[u] + \langle \lambda, C(u) \rangle
$$

- $\lambda$ 是拉格朗日乘子（Lagrange Multiplier），它本身是一个未知函数。
- $\langle \lambda, C(u) \rangle$ 表示拉格朗日乘子和约束项的乘积积分。

最小化 $\mathcal{L}[u, \lambda]$ 需要对 $u$ 和 $\lambda$ 都求偏导为零。

首先，离散化： 对 $u$ 和 $\lambda$ 都使用基函数近似：

$$
u_h = \sum c_j \phi_j \quad \text{和} \quad \lambda_h = \sum \mu_k \psi_k
$$

>（注意： $\lambda$ 的基函数 $\psi_k$ 通常与 $u$ 的基函数 $\phi_j$ 不同）。

求导：
-  $\frac{\partial \mathcal{L}}{\partial c_i} = 0 \quad \Rightarrow \quad \mathbf{K} \mathbf{c} + \mathbf{B}^T \boldsymbol{\mu} = \mathbf{f}$
-  $\frac{\partial \mathcal{L}}{\partial \mu_k} = 0 \quad \Rightarrow \quad \mathbf{B} \mathbf{c} = \mathbf{g}$ (这正是离散化的约束条件 $\mathbf{C}(\mathbf{c})=0$)

最终矩阵形式： 这两个方程合在一起，形成一个更大的鞍点问题（Saddle Point Problem），通常是非对称的：

$$
\begin{bmatrix}
\mathbf{K} & \mathbf{B}^T \\
\mathbf{B} & \mathbf{0}
\end{bmatrix}
\begin{Bmatrix}
\mathbf{c} \\
\boldsymbol{\mu}
\end{Bmatrix}
=\begin{Bmatrix}
\mathbf{f} \\
\mathbf{g}
\end{Bmatrix}
$$

-  $\mathbf{K}$： 原始刚度矩阵。
-  $\mathbf{B}$： 约束矩阵，由约束条件 $C(u)$ 的离散化产生。
-  $\mathbf{0}$：左下角的零矩阵（因为约束 $C(u)=0$ 通常不直接涉及乘子 $\lambda$ 自身的导数）。

> 这个矩阵是**非对称且不定（Indefinite）**的（对角线上有零），无法使用简单的共轭梯度法（CG），需要更复杂的迭代求解器，如 $\text{MINRES}$ 或 $\text{GMRES}$。

#### 第三类约束：罚函数法 (Penalty Method)
如果约束条件不太硬性（允许轻微违反），可以使用罚函数法，避免拉格朗日法的复杂性。

我们将约束条件的平方乘以一个巨大的罚因子 $\gamma$，加回到原始能量泛函中：

$$
\min_u \Pi_{\gamma}[u] = \Pi[u] + \frac{1}{2}\gamma \langle C(u), C(u) \rangle
$$

-  $\gamma$ 是一个很大的数（如 $10^8$ ）。


罚函数法的好处是它不引入新的未知数 $\lambda$。它只会修改原始的 $\mathbf{K}$ 矩阵和 $\mathbf{f}$ 向量：

$$
(\mathbf{K} + \gamma \mathbf{M}_C) \mathbf{c} = \mathbf{f} + \gamma \mathbf{f}_C
$$

-  $\mathbf{M}_C$ 和 $\mathbf{f}_C$ 由约束 $C(u)$ 产生。

$\mathbf{K}$ 矩阵的条件数会随着 $\gamma$ 增大而急剧恶化，导致迭代求解器（如 $\text{CG}$）收敛速度极慢或直接发散。如何选择合适的 $\gamma$ 是一个难题。
